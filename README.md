# Feed Reader Testing Project
 This is a web-based application that reads RSS feeds, created as a project for Udacity FEND Nanodegree.
## Table of Contents
 * [Getting started](#Getting-started)
 * [Project-Dependencies](#Project-Dependencies)
 * [About-Tests ](#About-Tests )
 * [Additional-Tests](#Additional-Tests)

## Getting-started
### How to run Application ?
#### Run Application Locally ####
 A simple way to go is to clone or download this git repository to your local machine.
 Locate to the repository/dist folder and open `index.html` file  on the browser.
#### How to run Gulp tool ####
* Ensure you've installed node.js. For more details, please refer to [node.js official website](https://nodejs.org/en/).
* Clone or download this git repository to your local machine.
* Locate to the project folder root cd project-folder-name
* Open terminal, install gulp ```npm install gulp@3.9.0```, [Reference website](https://libraries.io/npm/gulp/3.9.0).
* Install gulp-sass ```npm install node-sass gulp-sass --save-dev```, [Reference website](https://www.npmjs.com/package/gulp-sass).
* Install browserSync ```npm install browser-sync --save-dev```, [Reference website](https://www.browsersync.io/docs#installation).
* Install gulp-autoprefixer```npm install --save-dev gulp-autoprefixer```, [Reference website](https://www.npmjs.com/package/gulp-autoprefixer).
* Install gulp-concat```npm install --save-dev gulp-concat```, [Reference website](https://www.npmjs.com/package/gulp-concat).
* Install gulp-uglify```npm install --save-dev gulp-uglify```, [Reference website](https://www.npmjs.com/package/gulp-uglify).
* Install pump ```npm install pump```, [Reference website](https://www.npmjs.com/package/pump).
* Install gulp-remove-code```npm install gulp-remove-code --save-dev```, [Reference website](https://www.npmjs.com/package/gulp-remove-code).
* Install gulp-eslint ```npm install gulp-eslint```, [Reference website](https://www.npmjs.com/package/gulp-eslint).
#### How to build project ####
1. Open terminal and locate to the project folder root cd project-folder-name.
2. Type ```gulp build``` , then project will be build and strored in dist production folder.
#### How to run project on local server and Watching Sass and html files for changes ####
1. Open terminal and locate to the project folder root cd project-folder-name.
2. Type ```gulp watch``` , project from dist folder will run on local server url as in terminal
## Project-Dependencies
 * Jasmine JavaScript Testing Framework
  ```
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jasmine/3.3.0/jasmine.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jasmine/3.3.0/jasmine.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jasmine/3.3.0/jasmine-html.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jasmine/3.3.0/boot.min.js"></script>
  ```
 * Google Fonts
  ```
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,100,300,700">
  ```
 * Google API
   ```
     <script src="http://google.com/jsapi"></script>
   ```
 * Jquery javascript library
   ```
     <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
   ```
 * Handlebars.js is a sweet javascript library for building clean logicless templates based on the Mustache Templating Language.
    ```
      <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.12/handlebars.min.js"></script>
    ```
## About-Tests

 * Test Suite ```RSS Feeds``` contains the following set of tests :-
    1. Test ```are defined``` to make sure that the allFeeds variable has been defined and that it is not empty.
    2. Test ```URL is defined``` that loops through each feed in the allFeeds object and ensures
       * its URL is defined.
       * the URL is not empty.
    3. Test ```name is defined``` that loops through each feed in the allFeeds object and ensures
       * its name is defined
       * the name is not empty.

 * Test Suite ```The menu``` contains the following set of tests :-
     1. Test ```is hidden by default``` ensures the Menu element is hidden by default.
     2. Test ```Menu is visible and hidden when menu icon is clicked``` ensures the menu changes visibility when the menu icon is clicked, This test have two expectations :
        * The menu display when menu icon is clicked
        * it hide when click menu icon again.
 * Test Suite ```Initial Entries``` contains one Test :-
      1. Test ```feed container has at least one entry``` ensures when the loadFeed function is called and completes its work, there is at least
      a single .entry element within the .feed container.
 * Test Suite ```New Feed Selection``` contains one Test :-
       1. Test ```content changes``` that ensures when a new feed is loaded
       by the loadFeed function, the feed content actually changes.

## Additional-Tests
 * Test Suite ```New Feed Selection``` contains Two Tests one required and other is additional:-
    1. Test ```Title changes``` that ensures when a new feed is loaded
    by the loadFeed function, the feed Title actually changes.
 * Test Suite ```The Slide Feed List``` contains the following set of tests :-
      1. Test ```slide Feed list has data from allfeed``` ensures that slide feed list
         has all name property from allFeeds array.
      2. Test ```Feed list selection change correct``` ensures that when slide list selection
         change , index will be change .
