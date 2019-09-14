function setlocalstore(setTime) {
	localStorage.setItem("usertime", setTime);
}

	let count = 0;
	var svalue;
	let apiLimitText = "Sorry but there's a 5s per API request to avoid spamming <br><br> Sorry for any inconvenient"

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
			let image = {
				1:{name:"star1",credits:"Photo by Francesco Ungaro from Pexels"},
				2:{name:"star2",credits:"Photo by Lucas Ettore Chiereguini from Pexels"},
				3:{name:"star3",credits:"Photo by Juan from Pexels"},
				4:{name:"star4",credits:"Photo by tommy haugsveen from Pexels"},
				5:{name:"star5",credits:"Photo by Min An from Pexels"},
				6:{name:"star6",credits:"Photo by Philippe Donn from Pexels"},
				7:{name:"star7",credits:"Photo by Free Nature Stock from Pexels"}
			}
			//random number from 1-7
			let random = Math.floor(Math.random() * imageNum);
			//changing the bg image
			$("body").css("background-image", "url('" + image[random+1].name + ".jpg')");
			$("#photoBy").html(image[random+1].credits);
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
			$(".custom_alert").html(apiLimitText);
			$(".custom_alert").css("opacity","0.8");
			$(".custom_alert").css("visibility","visible");
			//$(".linkBtn").css("visibility","hidden");
			setTimeout(()=>{
				$(".custom_alert").css("opacity","0.0");
				$(".custom_alert").css("visibility","hidden");
			},5000)
		}
	}
	$("#new").click(quote);
});

/* Set the width of the side navigation to 45% & shader opacity to 0.6 */
function openNav() {
	$("#sideNav").css("width","45%");
	$(".shader").css("opacity","0.6");
  count = 1
}

/* Set the width of the side navigation to 0 & shader opacity to 0*/
function closeNav() {
	$("#sideNav").css("width","0");
	$(".shader").css("opacity","0");
	count = 0
}