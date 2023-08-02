# goaly

goaly is a twitter like clone where uses can post goals for their future and create challenges to do with friends.

check out [goaly](https://goaly.onrender.com/)

## Index

[Feature List](https://github.com/danielbuva/goalie/wiki/Feature-Document:-goalie) | [Database Scheme](thub.com/danielbuva/goalie/wiki/Database-Schema-Image) | [API Documentation](https://github.com/danielbuva/goalie/wiki/API-Documentation) | 

## Technologies Used
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)  ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

## Landing Page

![landing-page-gif](https://media.giphy.com/media/r8eVaZhCFk1fXHgjJW/giphy.gif)


## Goal

![goal-gif](https://media.giphy.com/media/MmzC6vvqv79BPrXzHj/giphy.gif)

## Challenge
![challenge-gif](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGdlMnpsY2piYnVseDRoMjVicWI5ZTd1bmxva2FzcDg1dWR4dmRmOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lIjrZ8KHtFOrF48fSu/giphy.gif)


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
       * ` pipenv run flask run -p 8000`
   * frontend :
       * ` npm start `
## Amazon Web Services S3
   * For setting up your AWS refer to this [guide](https://github.com/jdrichardsappacad/aws-s3-pern-demo)


## Features
### Goals
   * Users can create a Goal
   * Users can read/view other Goals
   * Users can update their Goals
   * Users can delete their Goals
### Challenges
   * Users can create a Challenge
   * Users can read/view their own Challenges
   * Users can update their Challenges
   * Users can delete their Challenges
### Follows
   * Users can follow other users
   * Users can unfollow other users
### Profile
   * Users can add/edit a pfp
   * Users can add/edit their banner
   * Users can edit their bio
   * Users can see their own goals
   * Users can see their own challenges

## Future Features
   * Search for challenges
   * Comunities 
