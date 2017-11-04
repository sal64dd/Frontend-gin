# Frontend-gin
Simple directory Structure and Basic starter files for my frontend projects.

## How to use? 
First install all the dependencies.
- npm install;

Gulp Tasks :
- watch : watches and builds all the files
- serve : serves the build dir with browser-sync and also watches for any changes
- sass : compiles sass to /build/precss
- postcss : applies postcss and build to /build/css
- babel : compiles /js/app files
- move-bootstrap : moves bootstrap scss source code to /src/sass

## Directory Structure
/build : Output file directory
- /images: images goes here

/src : Source file directory
- /sass : all the sass source files goes here
- /js/app : all the js source code goes here (this folder goes through babel)
- /js/include : all external js files goes here like jquery.js etc.
- *.html : all html files can go in the root dir




