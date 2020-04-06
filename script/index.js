function setlocalstore(setTime) {
	localStorage.setItem("usertime", setTime);
}

let apiLimitText = "Sorry but there's a 5s per API request to avoid spamming <br><br> Sorry for any inconvenient"

$(window).on('load', function(e) {
	quote();
	function quote () {
		let date = new Date();
		let militime = date.getTime();

		last_time = localStorage.getItem("usertime");
		//if user time is null or after the time is 10s forward
		if ( last_time == null || (militime - last_time) > 5000) {
			
			e.preventDefault();
			$.ajax( {
				url: 'https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand',
				success: function(data) {
					let post = data.shift();
					//quotes author and the contents
					$('#author').text(" ~ " + post.title.rendered);
					$('#content').html(post.content.rendered);
				},
				cache: false
			});
			setlocalstore(militime);
		}else {
			$(".custom_alert").html(apiLimitText);
			$(".custom_alert").css("opacity","0.8");
			$(".custom_alert").css("visibility","visible");
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
	if (window.innerWidth >= 800) {
		$("#sideNav").css("width","40%");
		$(".shader").css("opacity","0.6");
		$(".shader").css("display","block");
	}else {
		$("#sideNav").css("width","100%");
	}
}

/* Set the width of the side navigation to 0 & shader opacity to 0*/
function closeNav() {
	if (window.innerWidth >= 800) {
		$("#sideNav").css("width","0");
		$(".shader").css("opacity","0");
		$(".shader").css("display","none");
	}else {
		$("#sideNav").css("width","0");
	}
}