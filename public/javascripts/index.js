$(function() {
    function loadshit(responseData) {
        console.log("YOYOY");
        $("#mpName").html(responseData.mpName);
        $("#constituency").html(responseData.mpConstituency)
        $("#mpPhoto").attr('src', responseData.image)
        $(".email a").attr('href', responseData.email + "?subject=Data Retention and Investigatory Powers Bill&body= Dear " + responseData.mpName + ", %0D%0A %0D%0A I am writing becasue I am greatly concerned about the Data Retention and Investigatory Powers Bill that is being rushed through parliment by all parties. I think this shows gross disregard for the political process. I consider this a very serious issue and I think it should at least be discussed in parliment. %0D%0A %0D%0A I hope that you will consider the constituents that elected you before voting on this bill.")
        createTweetLink(responseData.twitter)
        $(".two").fadeOut(function() {
            $(".three").fadeIn();
        })
    }

    function createTweetLink(handle) {
        var twtTitle  = "Hey " + handle + " I'm not happy that you're voting for DRIP without even debating it #voteAgainstDRIP";
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
})