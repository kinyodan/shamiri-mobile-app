# Journaling App

Personal Journaling App.

## Description

A mobile application and a backend service for personal journaling. Users should be able to write journal entries, categorize them, and view a summary of their entries.

## Getting Started

## Mobile app

### Dependencies

* Node version used in dvelopemnt; Node v20.12.2.
* Development framework is Raect Native (Javascript) no typescript
* Developed using Expo <a href='https://docs.expo.dev/tutorial/create-your-first-app/'> find Expo documentation here </a> 

### Installing

* Clone this reposiroty into your local machine ( repo link https://github.com/kinyodan/shamiri-mobile-app.git )
* CD into the cloned repository folder
* Run below commands 

### Executing program

* To install modules 
```
 npm install 
```
* Start the Expo application 
```
 npx expo start
```
* There are several other ways to run the application including on your Mobile device as documented here; <a href='https://docs.expo.dev/tutorial/eas/introduction/'>Expo documentation on running the application</a>

## Backend Api

### Dependencies

* Python version used Python 3.10.12 but should not be a problem with most python distributions.
* Framework used FastApi (a python based framework) version details (FastAPI CLI version: 0.0.4) <a href='https://fastapi.tiangolo.com/#installation'>Fastapi source page here</a>
* Docker <a href="https://docs.docker.com/engine/install/">find docker source here</a>

### Installing

* Clone this reposiroty into your local machine ( repo link https://github.com/kinyodan/shamiri-case-study.git )
* CD into the cloned repository folder and then CD into the "/backend" folder
* Run below commands 

### Building the docker mage 

* While having docker installed in your machine (link shared above under dependecies)
* Step 1: To build the docker image Run
```
docker-compose build
```
* Step 2: Start the Docker Containers:
```
docker-compose up -d
```
* Step 3: Running Migrations:
   Create the migrations:
   ```
   docker-compose exec web alembic revision --autogenerate -m "init"
   ```
   Apply the Migration:
   ```
   docker-compose exec web alembic upgrade head
   ```
* If all is well the backend should be up and running on localhost <strong>( http://0.0.0.0:8000/ ) </strong>
   you can test it using api testng tools like <a href="https://www.postman.com/"> postman <a/> or any others to confirm all is well.

  NB: Remember to stop the running service for posgresql since its the databse used on the docker container
  
  ```
  sudo service postgresql stop
  ```


### Tests
Running the command at step 2 above will also run the tests at app initialization.
But to run test yourself, then after the steps outlined in the installation section above have been completed succesfully ,run below
command on terminal while in the root folder of the application.
```
docker-compose run test 
```
The test tool used is Pytest 

But also after finishing all the Installation steps outlined above running 
```
docker-compose up 
```
will run the tests during application start up and you can see the test result output
