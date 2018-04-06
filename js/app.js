let quote, author, color;
let counter = 0;

// Generate and apply new quote. 
$('.new_quote').on('click', function() {
	$.ajax({
			url: "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]&callback=",
			jsonp: 'jsonp',
			cache: false, 
			success: function(data) {
				quote = data[0].content;
				author = data[0].title;
			}
		});

	// Tweet should only work if a new quote is generated and applied.
	counter += 1; 

// Generate and apply random color
	$.ajax({
		url: "https://www.colr.org/json/color/random",
		jsonp: 'jsonp',
		cache: false,
		success: function(data) {
			color = jQuery.parseJSON(data);
			color = color.colors[0].hex;
			color = "#" + color;
		}
	});
});


// Implement tweet function every time tweet button is clicked`
$('.twitter').on('click', () => {
	if (counter !== 0) {
		let tweetURL = "https://twitter.com/intent/tweet?";
		let tweetText = "text=" + $(quote).text();
		tweetURL += tweetText + " - " + author;
		$('.twitter').attr('href', tweetURL);
	}else {
		let tweetURL = "https://twitter.com/intent/tweet?";
		let tweetText = "text=" + $('.quote').text() + $('.author').text();
		tweetURL += tweetText;
		$('.twitter').attr('href', tweetURL);
	}
	
});

// After ajax loads, apply random color to body and buttons. 
$(document).ajaxStop(function(event, request, settings) {
	$('.quote').html(quote);
	$('.author').html(author);
	$('body').css('backgroundColor', color);
	$('p').css('color', color);
	$('.twitter, .new_quote, body, .quote, .author').addClass('trance');
	$('.twitter, .new_quote').css({backgroundColor: color, color: '#fff', borderColor: 'transparent'});
});


