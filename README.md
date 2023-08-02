# goaly

goaly is a twitter like clone where uses can post goals for their future and create challenges to do with friends.

check out [goaly](https://goaly.onrender.com/)

## Index

MVP Feature List| [Database Scheme](thub.com/danielbuva/goalie/wiki/Database-Schema-Image) | [User Stories](https://github.com/ihavenoide/final-aa-project/wiki/User-Stories) | [Wire Frames](https://github.com/ihavenoide/final-aa-project/wiki/Wireframes)

## Technologies Used

( Python, JavaScript, React, Redux, Flask, SQLAlchemy )

## Getting started

1. Clone this repository: https://github.com/danielbuva/goalie.git
2. Install denpendencies into the Backed and the Frontend by making a terminal for each one and then run the following:
   * backend (In base of directory):
       * ` Pipenv install `
   * frontend :
       * ` npm install `
3. Create a .env file using the .envexample provided

4. Set up your database with information from your .env and then run the following to create your database, migrate, and seed (base directory):
   * ` Pipenv shell `
   * ` flask db init `
   * ` flask db migrate `
   * ` flask db upgrade `
   * ` flask seed all `
5. Start the app for both backend and frontend using:
   * backend :
       * ` flask run `
   * frontend :
       * ` npm start `
## Amazon Web Services S3
   * For setting up your AWS refer to this [guide](https://github.com/jdrichardsappacad/aws-s3-pern-demo)


## Landing Page




https://github.com/danielbuva/goalie/assets/115672875/dae6f7a7-03a5-4811-a72a-38e6325afc74




## Goal

https://github.com/ihavenoide/final-aa-project/assets/104161335/e3bdcef6-61c2-49e5-a0a7-cc791b513f99

## Challenge

https://github.com/ihavenoide/final-aa-project/assets/104161335/0418f2e7-20ab-4cd3-a888-8f6ade2b9d44


## Features
### Goals
   * Users can create a Goal
   * Users can read/view other Goals
   * Users can update their Goals
   * Users can delete their Goals
### Folders
   * Users can create a Challenge
   * Users can read/view their own Challenges
   * Users can update their Challenges
   * Users can delete their Challenges

## Future Features
   * Search for challenges
   * Comunities 
