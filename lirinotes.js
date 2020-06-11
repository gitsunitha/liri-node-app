// Load the NPM Packages
require("dotenv").config();

var inquirer = require("inquirer");

var inquirer1 = require("inquirer");

var lirimodules = require("./liri.js")

// Create a "Prompt" with a series of questions.
inquirer
    .prompt([
        // User chooses what search he wants he wants .
        {
            type: "list",
            message: "What would you like to search for?",
            choices: ["Movie", "Song", "Band", "DoWhatitSays"],
            name: "chooseAPI",
            default: "Movies"
        },

    ])
    .then(function(inquirerResponse) {
        // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
        if (inquirerResponse.chooseAPI) {
            inquirer1
                .prompt([
                    // User chooses what search he wants he wants .
                    {
                        type: "input",
                        message: "What " + inquirerResponse.chooseAPI + " would you like to search for?",
                        name: "nameToSearch",
                        default: "Mr. Nobody",
                        validate: async(input) => {
                            if (!input) {
                                return "Please enter a  " + inquirerResponse.chooseAPI + " to search";
                            }

                            return true;
                        }
                    },

                ])
                .then(function(inquirerResponse1) {
                    //console.log(inquirerResponse1.nameToSearch)
                    // Here we know that we should get a search value
                    switch (inquirerResponse.chooseAPI) {
                        case "Movie":
                            lirimodules.searchForMovies(inquirerResponse1.nameToSearch)

                            break;
                        case "Band":
                            lirimodules.searchBandsInTown(inquirerResponse1.nameToSearch)
                            break;
                        case "Song":
                            lirimodules.searchForSong(inquirerResponse1.nameToSearch)
                            break;
                        case "DoWhatitSays":
                            lirimodules.doWhatItSays(inquirerResponse1.nameToSearch)
                            break;
                        default:
                            console.log("Invalid Case : Where did this come from?")
                            break;
                    }
                })

        } else {
            // should never reach this point.
            console.log("Sorry you need to choose an input")
        }

    })


function searchForSong(songName) {
    var Spotify = require('node-spotify-api');
    console.log("inside function")
    var spotify = new Spotify({
        id: "cb80a141ad0b4b55b55a29f07141d3aa",
        secret: "fb2844b11cd7498aba8ddae06246a9c5"
    });

    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(JSON.stringify(data));
    });
}