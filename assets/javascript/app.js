var topics = ["Pandas", "Penguins", "Owls", "Cats", "Frogs", "Gorillas", "Turtles", "Cows"];

// Create buttons from initial topics
function createButton() {
    for (var i = 0; i < topics.length; i++) {
        var topicButton = $("<button class='btn btn-primary search'>");
        topicButton.text(topics[i])
        $("#topicButtons").append(topicButton);
    };
}
createButton();

// Add new topicButton from user input
$("#search").on("click", function() {
    var newTopic = $("#searchTopic").val().trim();
    topics.push(newTopic);
    $("#topicButtons").html("");
    createButton();
});

//Load Gifs when topicButton clicked
$(document).on("click", ".search", function() {
    event.preventDefault();
    $("#gifs").html("");

    var topic = $(this).text();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&limit=100&api_key=WXJ8V0Pfc06ccD0tCi6Ws0i702Q7BkHv";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var results = response.data;
        var numResults = 10;
        function showGifs() {
            for (var i = 0; i < numResults; i++) {
                if (results[i].rating !== "r") {
                    var gif = $("<img class='gif' state='still'>");
                    var rating = $("<h5>Rating: " + results[i].rating + "</h5>");
                    var title = $("<h4>" + results[i].title + "</h4>");
                    var still = results[i].images.fixed_height_still.url;
                    var play = results[i].images.fixed_height.url;
                    gif.attr("src", still)
                        .attr("still", still)
                        .attr("play", play);
                    $("#gifs").append(gif)
                        .append(title)
                        .append(rating);
                }
            }
        } showGifs();
        $("#addGifs").on("click", function() {
            numResults = numResults + 10;
            $("#gifs").html("");
            showGifs();
        })
    });
});

// Gif animation switch
$(document).on("click", ".gif", function() {
    var state = $(this).attr("state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("play"))
            .attr("state", "play");
    } else {
        $(this).attr("src", $(this).attr("still"))
            .attr("state", "still");
    }
});