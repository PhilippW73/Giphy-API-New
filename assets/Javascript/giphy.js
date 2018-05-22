$( document ).ready(function() {
	var comics = ["Batman", "Superman"];

// displayComicInfo function re-renders the HTML to display the appropriate content

	function displayComicInfo() {

		var comic = $(this).attr("data-comic");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
	        comic + "&api_key=FysH7E39RWPxOtgrJsm3Sr5T7TAjV2pa&limit=10";
			
			$.ajax({
	          url: queryURL,
	          method: "GET"
	        }).done(function(response) {
	        
	        var results = response.data;
	        	
	        	for (var i = 0; i < results.length; i++) {
		        	
		        	var gifDiv = $("<div class='item'>");
		        	var rating = results[i].rating;
		        	var a = $("<p>").text("Rating: " + rating);
		        	gifDiv.append(a);

		        	var comicImage = $("<img>");
		        	comicImage.attr("src", results[i].images.fixed_height.url);
		        	comicImage.attr("data-still", results[i].images.fixed_height_still.url);
		        	comicImage.attr("data-animate", results[i].images.fixed_height.url);
		        	comicImage.attr("data-state", "animate");
		        	$(comicImage).addClass("gif");
		            gifDiv.append(comicImage);
		        	$("#gifs-appear-here").prepend(gifDiv);
				}
			});
}

	$(document).on("click", ".gif", function() {
		// The attr jQuery method allows to get or set the value of any attribute on our HTML element
	    var state = $(this).attr("data-state");
	    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      	// Then, set the image's data-state to animate
      	// Else set src to the data-still value
	      if (state === "still") {
	        $(this).attr("src", $(this).attr("data-animate"));
	        $(this).attr("data-state", "animate");
	      } else {
	        $(this).attr("src", $(this).attr("data-still"));
	        $(this).attr("data-state", "still");
	      }
	});

//Example inspect
// <img src="https://media3.giphy.com/media/YsTs5ltWtEhnq/200_s.gif" 
// data-still="https://media3.giphy.com/media/YsTs5ltWtEhnq/200_s.gif" 
// data-animate="https://media3.giphy.com/media/YsTs5ltWtEhnq/200.gif" 
// data-state="still" 
// class="gif">
// --> Animate / still does not work although i use same function as in pausing gifs exercise. img data from my console actually works when I input them in the pausing gifs exercise

// Function for displaying comic data
	function renderButtons() {
		$("#buttons-view").empty();
			for (var i=0; i < comics.length; i++) {
				var b = $("<button>");
				b.addClass("comic");
				b.addClass("btn btn-primary")
				b.attr("data-comic", comics[i]);
				b.text(comics[i]);
				$("#buttons-view").append(b);
		}
	}
// This function handles events where a comic button is clicked
	$("#add-comic").on("click", function(event) {
	        event.preventDefault();
	        var comic = $("#comic-input").val().trim();
	        comics.push(comic);
	        renderButtons();
	        document.getElementById("comic-input").value="";

	});

// Adding a click event listener to all elements with a class of "comic"
	$(document).on("click", ".comic", displayComicInfo);
// Calling the renderButtons function to display the intial buttons
	renderButtons();
});