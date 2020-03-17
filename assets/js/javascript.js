$(document).ready(function() {
  // create variables for search results and buttons

  var topics = ["Rick Sanchez", "Morty", "Mr.Poopybutthole"];

  // connect to gify through ajax

  $("#submitPress").on("click", "btn", function() {
    var dataName = $(this).attr("data-name");

    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      dataName +
      "&api_key=bAO2QEf1si5vORdg2P2ONcJAe9QMbxT9&limit=10";

      console.log(dataName);

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);

      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var rickDiv = $("<div>");

        var p = $("<p>").text("Rating: " + results[i].rating);

        var rickImage = $("<img>");

        rickImage.attr("src", results[i].images.fixed_height.url);

        // Appending the paragraph and image tag to the animalDiv
        rickDiv.append(p);
        rickDiv.append(rickImage);

        // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
        $("#gifArea").prepend(rickDiv);
      }
    });

    console.log(queryURL);
  });

  // log and display user input and push into the array

  $("#submitPress").on("click", function(event) {
    event.preventDefault();
    
    console.log(submitPress);

    var character = $("#form")
      .val()
      .trim();

    topics.push(character);
    $("#user-input").val("");

    displayBtn();

    console.log(topics);
  });


    //function to create the buttons from the array

    function displayBtn() {
        $("#buttonArea").empty();
    
        for (var i = 0; i < topics.length; i++) {
          var a = $("<button>");
          a.addClass("btn btn-default");
          a.attr("data-name", topics[i]);
          a.text(topics[i]);
          $("#buttonArea").append(a);
        }
      }
      displayBtn();
    





      // create function to animate and still gif
      $("#gifArea").on("click", ".gif", function(event) {
          event.preventDefault();

          var state = $(this).attr("data-state");

          if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
          } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
          }
      })
});

