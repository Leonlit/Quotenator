function setlocalstore(setTime) {
	localStorage.setItem("usertime", setTime);
}

	let count = 0;
	var svalue;

	$(window).on('load', function(e) {
		quote();
		function quote () {

			var date = new Date();
			var militime = date.getTime();

		last_time = localStorage.getItem("usertime");
		//if user time is null or after the time is 10s forward
		if ( last_time == null || (militime - last_time) > 5000) {
			console.log("changed time")
			//variable
			let imageNum = 6
			//need to find ways to take totally random image from somewhere else
			let image = ["star1","star2","star3","star4","star5","star6","star7",]
			//random number from 1-7
			let random = Math.floor(Math.random() * imageNum);
			//changing the bg image
			$("body").css("background-image", "url('" + image[random] + ".jpg')");
				e.preventDefault();
				$.ajax( {
					url: 'https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand',
					success: function(data) {
						var post = data.shift();
						//quotes author and the contents
						$('#author').text(" ~ " + post.title.rendered);
						$('#content').html(post.content.rendered);
						console.log(data)

						if (typeof post.custom_meta != 'undefined' && typeof post.custom_meta.Source != 'undefined') {
							$('#source').html('Quote source : ' + post.custom_meta.Source);
						} else {
							$('#source').text('');
						}
					},
					cache: false
				});
				setlocalstore(militime);
			}else {
				$(".alert_container").html("Sorry but there's a 5s per API request to avoid spamming <br><br> Sorry for any inconvenient");
				$(".custom_alert").css("opacity","1.0");
				$(".custom_alert").css("visibility","visible");
				//$(".linkBtn").css("visibility","hidden");

				if (count == 1) {
					$(".custom_alert").css("opacity","0.0");
					$(".custom_alert").css("visibility","hidden");
					count = 0;
				}else {
					$(".alert_container").html("Sorry but there's a 5s per API request to avoid spamming <br><br> Sorry for any inconvenient");
					$(".custom_alert").css("opacity","1.0");
					$(".custom_alert").css("visibility","visible");
					count = 1;
				}
			}
		}
		$("#new").click(quote);
});

//custom alert box
$("#about").click(function () {
	if (count==0) {
		$(".alert_container").html("Hi and welcome to Quatenator, a simple quotes generator. I used JQuery, HTML, and CSS. The major function of this app is it generate random quote which is pretty awesome so after googling on the internet I found a great quote API provider, <a href='https://quotesondesign.com/'>quotesondesign</a>. Well, thanks to it now this web app can generate a random quote.<br><br>    well the web app itself just basically request a random quote from quotesondesign and then post the quote onto the page. I got the image from <a href='https://www.pexels.com/search/night%20sky/'>pexels</a>. Although they don't require downloader to provide an attribution but I insist to mention about them.");
		$(".custom_alert").css("opacity","1.0");
		$(".custom_alert").css("visibility","visible");
		count = 1
	}else if (count==1){
		$(".custom_alert").css("opacity","0.0");
		$(".custom_alert").css("visibility","hidden");
		count = 0
	}

	$(".custom_alert").click(function () {
		$(".custom_alert").css("opacity","0.0");
		$(".custom_alert").css("visibility","hidden");
		count = 0
	})
});