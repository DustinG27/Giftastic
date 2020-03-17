$(document).ready(function() {
  // create variables for search results and buttons

  var topics = ["Rick Sanchez", "Morty", "Mr.Poopybutthole"];

  // log and display user input and push into the array

  $("#submitPress").on("click", function(event) {
    event.preventDefault();

    // console.log($("#user-input").val());

    //  var character = $("#form")
    //   .val()
    //   .trim();

    var clickInput = $("#user-input").val();
    topics.push(clickInput);

    displayBtn();

    console.log(topics);
  });

  // connect to gify through ajax

  function showGif() {
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
        rickImage.addClass("image");

        // Appending the paragraph and image tag to the animalDiv
        rickDiv.append(p);
        rickDiv.append(rickImage);

        // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
        $("#gifArea").prepend(rickDiv);
      }
    });

    console.log(queryURL);
  }

  //function to create the buttons from the array

  function displayBtn() {
    $("#buttonArea").empty();

    for (var i = 0; i < topics.length; i++) {
      var a = $(`<button>`);
      a.addClass("btn");
      a.addClass("gif-btn");
      a.addClass("btn-default");
      a.attr("data-name", topics[i]);
      a.text(topics[i]);
      $("#buttonArea").append(a);
    }
  }
  displayBtn();

  $(document).on("click", ".gif-btn", showGif);

  $(document).on("click", ".image", function() {
    // create function to animate and still gif

    var state = $(this).attr("data-state");

    console.log("hello");

    if (state === "still") {
      $(this).attr("src", $(this).data("animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).data("still"));
      $(this).attr("data-state", "still");
    }
  });
});
