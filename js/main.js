// ------------------------
//  Model
// ------------------------
var data = {

	results: {
		searchTerm: null,
		titles: null,
		descriptions: null,
		urls: null
	}

}; // end of data



// ------------------------
//  Controler
// ------------------------
var controller= {

	init: function(){
		view.init();
	},

	search: function(searchTerm){
		$.ajax({
			dataType: "jsonp",
			url: "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + searchTerm,
			success: function(results) {
				console.log(results);
				controller.setResults(results);
			}
		});
	},

	setResults: function(results){
		data.results.searchTerm = results[0];
		data.results.titles = results[1];
		data.results.descriptions = results[2];
		data.results.urls = results[3];
	}

}; // end of controller



// ------------------------
//  View
// ------------------------
var view = {

	init: function(){
		this.createSearchHandler();
	},

	createSearchHandler: function(){

		$("#searchButton").on("click",function(){
			var searchTerm = $("#searchTerm").val();
			controller.search(searchTerm);
		});
	}

}; // end of view



controller.init();

