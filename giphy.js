var teams = ["Alabama", "USC", "LSU", "Clemson", "Texas", "Oklahoma", "Utah", "Ohio State", "Notre Dame", "Michigan"]
console.log(teams);

//using array elements to generate HTML buttons
function renderButtons() {
        // Deletes the movies prior to adding new movies
        $("#teamButtons").empty();
        // Loops through the array of teams
        for (var i = 0; i < teams.length; i++) {
          var a = $("<button>");
          a.addClass("team");
          a.attr("data-preview", teams[i]);
          a.text(teams[i]);
          $("#teamButtons").append(a);
        }
      }
      // This function handles events where the submit button is clicked
      $("#addTeam").on("click", function(event) {
        event.preventDefault();
        var team = $("#team-input").val().trim();
        teams.push(team);
        renderButtons();
      });

// code to pause the gif (it's not working)
      $(".gif").on("click", function() {
		var state = $(this).attr('data-state');
      	var animateUrl = $(this).attr('data-animate');
      	var stillUrl = $(this).attr('data-still');
		if (state === "still") {
        $(this).attr('src', animateUrl);
        $(this).attr('data-state', 'animate');
      }
      else if (state === "animate") {
        $(this).attr('src', stillUrl);
        $(this).attr('data-state', 'still');
      }
	});

//Display Gif function

	$("#teamButtons").on("click", "button", function() {
	var team = $(this).attr('data-preview');
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + team + " football&api_key=479f8974e4884cedb4aa18e7474adaa6&limit=10";
	$.ajax({
		url: queryURL,
		method: "Get"
	}).done(function(response) {
		var results = response.data;
		for (var i = 0; i < results.length; i++) {
			var gifDiv = $("<div class='item'>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var teamImage = $("<img>");
            teamImage.attr("src", results[i].images.fixed_height.url);
            gifDiv.prepend(p);
            gifDiv.prepend(teamImage);
            $("#teamsAppearHere").prepend(gifDiv);
		}
	  });
	});

renderButtons();