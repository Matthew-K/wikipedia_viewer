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
				// console.log(results);
				controller.setResults(results);
				view.displayResults(controller.getResults());
			}
		});
	},

	setResults: function(results){
		data.results.searchTerm = results[0];
		data.results.titles = results[1];
		data.results.descriptions = results[2];
		data.results.urls = results[3];
	},

	getResults: function(){
		return data.results;
	}

}; // end of controller



// ------------------------
//  View
// ------------------------
var view = {

	init: function(){
		this.searchByButton();
		this.searchByEnter();
	},

	// creates search button click handler
	searchByButton: function(){
		$("#searchButton").on("click",function(){
			// find the search term
			var searchTerm = $("#searchTerm").val();
			// use as as an input for an ajax call
			controller.search(searchTerm);
			// removes previous search results
			$(".result").remove();
		});
	},
	
	// creates "enter" keypress handler
	searchByEnter: function(){
		$('#searchTerm').keypress(function(e){ 		
	    	var keyCode = e.which;
	    	if (keyCode === 13) {
	       	   $('#searchButton').trigger('click');
	    	}
		});
	},

	displayResults: function(results){
		//for every title in results
		for(var i = 0; i < results.titles.length; i++){
			var title = results.titles[i];
			var description = results.descriptions[i];
			var url = results.urls[i];	
			// append a div with the corresponding title, description, and url to #results
			$("#results").append(
				"<div class='result'>" + 
					"<h2>" + title + "</h2>" + 
					"<p>" + description + "</p>" + 
					"<a href='" + results.urls[i] + "'>Click here for more</a>" + 
				"</div>"
			);
		}
	}

}; // end of view


// Initialize on start
controller.init();

