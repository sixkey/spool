﻿# Spool
Spool is a framework for creating socket.io based multiplayer games

## Getting started 

Spool requires node.js, express, socket.io and more

For installation follow this simple steps:
1. install node.js 
2. get git and pull repository 
3. run npm install
```
npm install
```
4. install nodemon with -g so you can use it in terminal
```
npm install -g nodemon
```
5. run project
```
nodemon test-app.js
```
6. open localhost:2000 on your browser of choice

## Warning 

Current file system is suitable only for development and needs to be changed for production.

Examples:
1. spoolclient.js need to be moved to public static folder
2. spoolmath.js and spoolmessages.js need to be copied to the folder spoolclient.js is in