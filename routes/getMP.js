var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var router = express.Router();

router.get('/', function(req, res) {
    var postcode = req.query.postcode;
    var url =  "http://findyourmp.parliament.uk/api/search?q=" + postcode + "&f=js"
    var data;

    getMPdata(url, data, res)
});

function getMPdata(url, data, res) {
    request(url, function(err, resp, body) {
        if (!err) {
            var result = JSON.parse(body);

            if (result.length > 0) {
                data = {
                    mpName : result.results.constituencies[0].member_name,
                    mpConstituency : result.results.constituencies[0].constituency_name,
                    mpBiography : result.results.constituencies[0].member_biography_url
                }

                scrapeBio(data, res);
            } else {
                res.writeHeaders("400")
                res.send("Incorrect Postcode");
            }

        }
    });
}

function scrapeBio (data, res) {
    request(data.mpBiography, function(err, resp, html) {
        if (!err) {
            $ = cheerio.load(html);
            data["email"] = $("#ctl00_ctl00_FormContent_SiteSpecificPlaceholder_PageContent_ctlContactDetails_rptPhysicalAddresses_ctl00_hypEmail").attr("href");
            data["twitter"] = $("#ctl00_ctl00_FormContent_SiteSpecificPlaceholder_PageContent_ctlContactDetails_rptSocialMedia_ctl02_hypLink").text();
            data["image"] = $("#ctl00_ctl00_FormContent_SiteSpecificPlaceholder_PageContent_ctlMemberImage_imgMember").attr("src");
            console.log(data);

            res.send(data)
        }
    });
}

module.exports = router;