$(function() {
    function loadshit(responseData) {
        console.log("YOYOY");
        $("#mpName").html(responseData.mpName);
        $("#constituency").html(responseData.mpConstituency)
        $("#mpPhoto").attr('src', responseData.image)
        $(".email a").attr('href', responseData.email + "?subject=Data Retention and Investigatory Powers Bill&body= Dear " + responseData.mpName + ", %0D%0A %0D%0A I am writing becasue I am greatly concerned about the Data Retention and Investigatory Powers Bill that is being rushed through parliment by all parties. I think this shows gross disregard for the political process. I consider this a very serious issue and I think it should at least be discussed in parliment before a decision is reached. %0D%0A %0D%0A I hope that you will consider the constituents that elected you before voting on this bill. The website I have used to contact you today will inform me of how you vote on this this bill, remember you work for us. ")
        createTweetLink(responseData.twitter, responseData.mpName)
        $(".two").fadeOut(function() {
            $(".three").fadeIn();
        })
    }

    function createTweetLink(handle, name) {
        if (handle.indexOf("@") == 0) {
            var twtTitle = "Hey " + handle + " I'm not happy that you're voting for DRIP without even debating it #DRIP";
        } else {
            var twtTitle = "Unfortunately my MP, " + name + " isn't on twitter, but I'm really annoyed that all the parties are voting through DRIP witout even debatin it. #DRIP";
            $(".tweet p.italic").html("Unfortunately your MP doens't use twitter, but you can tweet generally about the bill to raise awareness.")
        }
        var twtUrl    = location.href;    
        var maxLength = 140 - (twtUrl.length + 1);
        if (twtTitle.length > maxLength) {
        twtTitle = twtTitle.substr(0, (maxLength - 3))+'...';
        }
        var twtLink = 'http://twitter.com/home?status='+encodeURIComponent(twtTitle + ' ' + twtUrl);
        $(".tweet a").attr('href', twtLink);
    }

    $(".yes").click(function() { 
        $(".one").fadeOut(function() {
            $(".two").fadeIn();
        });
    });

    $(".postcode input").keypress(function() {
        $("#postcodeSubmit").fadeIn();
    })

    $(".postcode").submit(function(e) {
        e.preventDefault();
        var data = {postcode: $("input").val()}

        $.ajax({
            url: "/getMP",
            data: data,
            success: function (responseData) {
                loadshit(responseData);
            }
        })
    })

    $(".tweet a, .email a").click(function() {
        $(".emails").fadeIn();
    })

    $("form.vote-check").submit(function (e) {
        e.preventDefault();
        $(".emails").html("<h2> Thank you </h2>")
    })
})