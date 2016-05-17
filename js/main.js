
var searchTerm = 'programming';

$.ajax({
	dataType: "jsonp",
	url: "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + searchTerm,
	success: function(data) {
		console.log(data);
		}
	});

