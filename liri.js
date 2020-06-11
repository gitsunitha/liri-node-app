require("dotenv").config();
var fs = require("fs")
var logFile = require("./logFile.js")

async function searchForMovies(movieName) {
    // Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
    var axios = require("axios");
    let responseData;


    // Then run a request with axios to the OMDB API with the movie specified
    await axios.get("http://www.omdbapi.com/?t=" + movieName + "&apikey=e7c15481").then(
            function(response) {
                responseData = response.data;
                if (responseData.Response === 'True') {
                    // data: { Response: 'False', Error: 'Movie not found!' }
                    var displayStr = "---------------------------------------------------------\n"
                    displayStr += "---------------- NEW MOVIE SEARCH RESULTS ---------------\n"
                    displayStr += "---------------------------------------------------------\n"
                    displayStr += 'Title                  - ' + responseData.Title + '\n'
                    displayStr += 'Year of Release         - ' + responseData.Title + '\n'
                    displayStr += 'IMDB Rating             - ' + responseData.imdbRating + '\n'
                    displayStr += 'Rotten Tomatoes Rating  - ' + responseData.Ratings[1].Value + '\n'
                    displayStr += 'Country(ies) (produced) - ' + responseData.Country + '\n'
                    displayStr += 'Language                - ' + responseData.Language + '\n'
                    displayStr += 'Actors                  - ' + responseData.Actors + '\n'
                    displayStr += 'Plot                    - ' + responseData.Plot + '\n'
                    displayStr += "\n\n"
                    console.log(displayStr)
                    logFile.logMessage(displayStr)
                } else {
                    logFile.logMessage(responseData.Error)
                    console.log(responseData.Error)
                }
            })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });


}

async function searchBandsInTown(artist) {

    // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything

    var axios = require("axios");
    let responseData;


    // Then run a request with axios to the OMDB API with the movie specified
    await axios.get("https://rest.bandsintown.com/artists/" + artist + "/events/?app_id=codingbootcamp").then(
        function(response) {

            var displayStr = "---------------------------------------------------------------------------\n"
            displayStr += "           CONCERT SEARCH RESULTS FOR " + artist + "\n"
            displayStr += "---------------------------------------------------------------------------\n"

            // format response
            responseData = response.data;
            if (responseData.length === 0) {
                displayStr += artist + " is not playing in the near future close to you"
            } else {
                displayStr += 'Name                  - ' + responseData[0].artist.name + '\n\n'
                    //display multiple venues
                responseData.forEach(element => {
                    displayStr += 'Venue                 - ' + element.venue.location + '\n'
                    displayStr += 'Dates                 - ' + element.datetime.substr(5, 2) + "/" +
                        element.datetime.substr(8, 2) + "/" + element.datetime.substr(0, 4) + '\n\n'
                });

                displayStr += "\n\n"
                console.log(displayStr)
                logFile.logMessage(displayStr)
            }
        });
}



function searchForSong(songName) {
    var Spotify = require('node-spotify-api');
    var keys = require("./keys.js");

    // var spotify = new Spotify({
    //     id: "cb80a141ad0b4b55b55a29f07141d3aa",
    //     secret: "fb2844b11cd7498aba8ddae06246a9c5"
    // });
    if (songName === null) {
        songName = "The Sign"
    }
    var spotify = new Spotify(keys.spotify);

    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var responseData = data.tracks.items[0]
        var displayStr = "---------------------------------------------------------\n"
        displayStr += "---------------- SONG SEARCH RESULTS -------------------\n"
        displayStr += "---------------------------------------------------------\n"
        displayStr += 'Artist                  - ' + responseData.artists[0].name + '\n'
        displayStr += 'Song                    - ' + responseData.name + '\n'
        displayStr += 'Preview Link            - ' + responseData.preview_url + '\n'
        displayStr += 'Album                   - ' + responseData.album.name + '\n'
        displayStr += "\n\n"
        console.log(displayStr)
        logFile.logMessage(displayStr)
    });
}

function doWhatItSays() {
    var fs = require("fs");
    var filename = process.env.DO_WHAT_IT_SAYS_FILE


    console.log("inside do what it says  function " + filename)
        // read the file
    fs.readFile(filename, "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // We will then print the contents of data
        console.log(data);

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
        if (dataArr.length < 2) {
            console.log("Not enough parameters")
        } else {

            switch (dataArr[0]) {
                case "Movie":
                    searchForMovies(dataArr[1])

                    break;
                case "Band":
                    searchBandsInTown(dataArr[1])
                    break;
                case "Song":
                    searchForSong(dataArr[1])
                    break;
                default:
                    console.log("Invalid input")
                    break;
            }
        }


    })
}

module.exports = {
    searchForMovies: searchForMovies,
    searchBandsInTown: searchBandsInTown,
    searchForSong: searchForSong,
    doWhatItSays: doWhatItSays

}