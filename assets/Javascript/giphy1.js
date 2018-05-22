    $( document ).ready(function() {

    var comics = ["Batman", "Superman"];

// displayMovieInfo function re-renders the HTML to display the appropriate content
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
                    var comicImage = $("<img>");
                    comicImage.attr("src", results[i].images.fixed_height.url);
                    comicImage.attr("data-still", results[i].images.fixed_height_still.url);
                    comicImage.attr("data-animate", results[i].images.fixed_height.url);
                    comicImage.attr("data-state", "still");
                    $(comicImage).addClass("gif");

                    gifDiv.append(a);
                    gifDiv.append(comicImage);
                    $("#gifs-appear-here").prepend(gifDiv);
                }
        });

    $(".gif").on("click", function() {
          var state = $(this).attr("data-state");
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
    });

}
// Function for displaying movie data
    function renderButtons() {
        $("#buttons-view").empty();
            for (var i=0; i < comics.length; i++) {
                var b = $("<button>");
                b.addClass("comic");
                b.attr("data-comic", comics[i]);
                b.text(comics[i]);
                $("#buttons-view").append(b);
        }
    }
// This function handles events where a movie button is clicked
    $("#add-comic").on("click", function(event) {
            event.preventDefault();
            var comic = $("#comic-input").val().trim();
            comics.push(comic);
            renderButtons();
    });


// Adding a click event listener to all elements with a class of "movie"
    $(document).on("click", ".comic", displayComicInfo);
// Calling the renderButtons function to display the intial buttons
    renderButtons();

});