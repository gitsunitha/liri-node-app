# LIRI Bot

### Overview

LIRI will be a command line node app that takes in inputs ( a select set)and gives you back data.

### User Guide

## Installation and Setup

1. Clone the repo and run npm install to get the required.
   `npm install`

2. Next, create a file named `.env`, add the following to it, replacing the values with your API keys (no quotes) , the filename that stores the do-what-it-says file and the log file name:

```js
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

DO_WHAT_IT_SAYS_FILE=doda.txt

LOG_FILE=log.txt


```

3. Setup is now complete.

## How to use
1. To run use the following command:
`node lirinotes`

* The User will be prompted to select one of the search options. 
	* If the User selects "Do what it says " option then the named file (name as per the one set up in the environment file)should be present
* The User is prompted to enter the string to search ( Song, Movie or Band)
	* In case of "Do what it says" option this input is ignored
* The search for the Song/Movie/Band is done and results are displayed
* For the "Do what it says" option, the file should have only one command in the following format:
	`<command> <search String>`
  Neither can be blank. Values for commands are : Song, Movie, Band, DoWhatitSays
  Example:
  ```js
  Song, Natural
  ```
  
  
