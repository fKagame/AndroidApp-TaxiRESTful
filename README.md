# Bank-of-Kigali-Challenge
 Exercise 1: Film Fan (Mobile) ▪ Exercise 2: Taxi 24 (APIs) 
 
 Attribution: All data used in this android app comes from TMDb
 Film Fan, App Name: Bk-Movies
 Features:
 1. View a sorted list of movies with their titles, the release date, the vote average and the movie poster
 2. You can select and view details of any movie
 3. You can rate a movie of your choice
 
Project setup
--------------
- Clone the repo, open the project (Movies) in Android Studio, hit "Run". Done!
    
Taxi 24:
Project setup
--------------
- Clone the repo, open the project (Taxi24) with your text editor
- Start the server by running index.js (nodemon index.js)
- Once the server is running, you can go ahead and make request to the API

API EndPoints (Json)
-------------------
1. GET  "/api/drivers": Return a list of all drivers
2. GET  "/api/drivers/{id}": Return one driver, where id is passed to the request
3. GET  "/api/available": Return a list of all available drivers
4. POST "/api/nearby?latitude={x}&longitude={y}": Return a list of available drivers within 3km 

