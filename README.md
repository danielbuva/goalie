# goalie

share goals with friends

## Database Schema Design

![db-schema]

[db-schema]: ./images/DatabaseDiagram.png

## API Documentation

## USER AUTHENTICATION/AUTHORIZATION

### All endpoints that require authentication

All endpoints that require a current user to be logged in.

- Request: endpoints that require authentication
- Error Response: Require authentication

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

### All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the
correct role(s) or permission(s).

- Request: endpoints that require proper authorization
- Error Response: Require proper authorization

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

### Get the Current User

Returns the information about the current user that is logged in.

- Require Authentication: true
- Request

  - Method: GET
  - URL: /api/session
  - Body: none

- Successful Response when there is a logged in user

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      }
    }
    ```

- Successful Response when there is no logged in user

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "user": null
    }
    ```

### Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

- Require Authentication: false
- Request

  - Method: POST
  - URL: /api/session
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "credential": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      }
    }
    ```

- Error Response: Invalid credentials

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Invalid credentials"
    }
    ```

- Error response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "credential": "Email or username is required",
        "password": "Password is required"
      }
    }
    ```

### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

- Require Authentication: false
- Request

  - Method: POST
  - URL: /api/users
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "username": "JohnSmith",
      "password": "secret password"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      }
    }
    ```

- Error response: User already exists with the specified email

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "User already exists",
      "errors": {
        "email": "User with that email already exists"
      }
    }
    ```

- Error response: User already exists with the specified username

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "User already exists",
      "errors": {
        "username": "User with that username already exists"
      }
    }
    ```

- Error response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "email": "Invalid email",
        "username": "Username is required",
        "firstName": "First Name is required",
        "lastName": "Last Name is required"
      }
    }
    ```

### Edit a User

Update a return an edited User

- Require Authentication: true
- Require proper authorization: User must belong to the current user
- Request

  - Method: PUT
  - URL: /api/users/:userId
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "firstName": "dani",
      "lastName": "buva",
      "email": "danibuva@gmail.com",
      "username": "danibuva",
      "bio": "hey I am dani :)",
      "image": "image url"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "dani",
        "lastName": "buva",
        "email": "danibuva@gmail.com",
        "username": "danibuva",
        "bio": "hey I am dani :)",
        "image": "image url"
      }
    }
    ```

- Error Response: Body validation error

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "email": "Email is taken",
        "username": "Username is taken",
        "bio": "bio must be less than 255 characters"
      }
    }
    ```

- Error response: Couldn't find a User with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "User not found"
    }
    ```

## GOALS

### Get all Goals

Returns all the goals (posts).

- Require Authentication: false
- Request

  - Method: GET
  - URL: /api/goals
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Goals": [
        {
          "id": 1,
          "userId": 1,
          "title": "Mile time of 5 minutes",
          "body": "I am going to train to lower my mile time ",
          "image": "image url",
          "doit": 25,
          "completed": false,
          "createdAt": "2023-07-01 20:39:36",
          "updatedAt": "2023-07-01 20:39:36"
        }
      ]
    }
    ```

### Get all Goals created by a User from a user id

Returns all the goals created by a user from a user id.

- Require Authentication: true
- Request

  - Method: GET
  - URL: /api/goals/:userId
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Goals": [
        {
          "id": 1,
          "userId": 1,
          "title": "Mile time of 5 minutes",
          "body": "I am going to train to lower my mile time ",
          "image": "image url",
          "doit": 25,
          "completed": false,
          "createdAt": "2023-07-01 20:39:36",
          "updatedAt": "2023-07-01 20:39:36"
        }
      ]
    }
    ```

- Error response: Couldn't find a User with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "User not found"
    }
    ```

### Get details of a Goal from an id

Returns the details of a goal specified by its id.

- Require Authentication: false
- Request

  - Method: GET
  - URL: /api/goal/:goalId
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "userId": 1,
      "title": "Mile time of 5 minutes",
      "body": "I am going to train to lower my mile time ",
      "image": "image url",
      "doit": 25,
      "completed": false,
      "createdAt": "2023-07-01 20:39:36",
      "updatedAt": "2023-07-01 20:39:36",
      "User": {
        "id": 1,
        "firstName": "Melody",
        "lastName": "Yoo"
      }
    }
    ```

- Error response: Couldn't find a Goal with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Goal not found"
    }
    ```

### Create a Goal

Creates and returns a new goal.

- Require Authentication: true
- Request

  - Method: POST
  - URL: /api/goals
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "title": "Mile time of 5 minutes",
      "body": "I am going to train to lower my mile time ",
      "image": "image url",
      "community": 0 // when creating a goal can send to main feed or community feed (0 = main)
    }
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "userId": 1,
      "title": "Mile time of 5 minutes",
      "body": "I am going to train to lower my mile time ",
      "image": "image url",
      "doit": 25,
      "completed": false,
      "createdAt": "2023-07-01 20:39:36",
      "updatedAt": "2023-07-01 20:39:36"
    }
    ```

- Error response: Couldn't find a Community with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Community not found"
    }
    ```

- Error Response: Body validation error

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "title": "Title must be less than 30 characters",
        "body": "Body is required", //  one or the other
        "body": "Body must be less than 500 characters",
        "community": "Community is required"
      }
    }
    ```

### Edit a Goals completion status

Updates completion status and returns an existing goal.

- Require Authentication: true
- Require proper authorization: Goal must belong to the current user
- Request

  - Method: PUT
  - URL: /api/goals/:goalId/complete
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "completed": true
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "userId": 1,
      "title": "Mile time of 4 minutes",
      "body": "I am going to train to lower my mile time ",
      "image": "image url",
      "doit": 25,
      "completed": false,
      "createdAt": "2023-07-01 20:39:36",
      "updatedAt": "2023-07-01 20:39:36"
    }
    ```

- Error Response: Body validation error

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "completed": "Completed is required"
      }
    }
    ```

- Error response: Couldn't find a Goal with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Goal not found"
    }
    ```

### Edit a Goal

Updates and returns an existing goal.

- Require Authentication: true
- Require proper authorization: Goal must belong to the current user
- Request

  - Method: PUT
  - URL: /api/goals/:goalId
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "title": "Mile time of 4 minutes",
      "body": "I am going to train to lower my mile time ",
      "image": "image url"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "userId": 1,
      "title": "Mile time of 4 minutes",
      "body": "I am going to train to lower my mile time ",
      "image": "image url",
      "doit": 25,
      "completed": false,
      "createdAt": "2023-07-01 20:39:36",
      "updatedAt": "2023-07-01 20:39:36"
    }
    ```

- Error Response: Body validation error

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "title": "Title must be less than 30 characters",
        "body": "Body is required", //  one or the other
        "body": "Body must be less than 500 characters",
        "community": "Community is required"
      }
    }
    ```

- Error response: Couldn't find a Goal with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Goal not found"
    }
    ```

### Delete a Goal

Deletes an existing goal.

- Require Authentication: true
- Require proper authorization: Goal must belong to the current user
- Request

  - Method: DELETE
  - URL: /api/goals/:goalId
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

- Error response: Couldn't find a Goal with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Goal not found"
    }
    ```

## Challenges

### Get all Challenges a User has

Returns all the Challenges a user is pariticipating/participated in by participant id.

- Require Authentication: false
- Request

  - Method: GET
  - URL: /api/challenges/participants/:participantId
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Challenges": [
        {
          "id": 1,
          "creatorId": 0, // 0 means created by goalie vs 1+ created by users
          "participantId": 1,
          "title": "Exercise",
          "body": "Get your blood pumping with some exercice!

          Exercise at least 3 times a week for 4 weeks",
          "particpants": 5,
          "completed": true,
          "image":  "image url", // probably an icon
          "createdAt": "2023-07-01 20:39:36",
          "updatedAt": "2023-07-01 20:39:36"
        }
      ]
    }
    ```

### Get all Challenges

Returns all the Challenges.

- Require Authentication: false
- Request

  - Method: GET
  - URL: /api/challenges
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Challenges": [
        {
          "id": 1,
          "creatorId": 0, // 0 means created by goalie vs 1+ created by users
          "participantId": 1,
          "title": "Exercise",
          "body": "Get your blood pumping with some exercice!

          Exercise at least 3 times a week for 4 weeks",
          "particpants": 5,
          "completed": true,
          "image": "image url",
          "createdAt": "2023-07-01 20:39:36",
          "updatedAt": "2023-07-01 20:39:36"
        }
      ]
    }
    ```

### Create a Challenge

Create and return a new Challenge.

- Require Authentication: true
- Request

  - Method: POST
  - URL: /api/challenges/new
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
     "title": "Study",
     "body": "With learning, comes knowledge. And with knowledge, comes the depth and ability to achieve many things.

     Study at least 3 horus a week for 4 weeks",
     "image": "image url"
    }
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
     "id": 1,
     "creatorId": 1,
     "title": "Study",
     "body": "With learning, comes knowledge. And with knowledge, comes the depth and ability to achieve many things.

     Study at least 3 horus a week for 4 weeks",
     "image": "image url",
     "particpants": 1,
     "createdAt": "2023-07-01 20:39:36",
     "updatedAt": "2023-07-01 20:39:36",
    }
    ```

- Error Response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "title": "Title is required", // or
        "title": "Title must be less than 18 characters",
        "body": "Body is required", // or
        "body": "Body must be less than 500 characters"
      }
    }
    ```

### Edit a Challenge

Update and return a challenge specified by id.

- Require Authentication: true
- Require proper authorization: Challenge must belong to the current user
- Request

  - Method: POST
  - URL: /api/challenges/:challengeId
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
       "title": "Study!",
     "body": "With learning, comes knowledge. And with knowledge, comes the depth and ability to achieve many things.

     Study at least 3 horus a week for 6 weeks",
     "image": "new image url"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
     "id": 1,
     "creatorId": 1,
     "title": "Study",
     "body": "With learning, comes knowledge. And with knowledge, comes the depth and ability to achieve many things.

     Study at least 3 horus a week for 4 weeks",
     "image": "image url",
     "particpants": 1,
     "createdAt": "2023-07-01 20:39:36",
     "updatedAt": "2023-07-01 20:39:36",
    }
    ```

- Error response: Couldn't find a Challenge with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Challenge not found"
    }
    ```

- Error Response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "title": "Title is required", // or
        "title": "Title must be less than 18 characters",
        "body": "Body is required", // or
        "body": "Body must be less than 500 characters"
      }
    }
    ```

### Join Challenge

User participates in a challenge

- Require Authentication: true
- Request

  - Method: POST
  - URL: /api/challenges/:challengeId/participants
  - Body: none

- Succesful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Success"
    }
    ```

- Error response: No Challenge with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Challenge not found"
    }
    ```

- Error response: User already participating in Challenge

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Already participating"
    }
    ```

### Delete participance to an event specified by id

Delete an participance to an event specified by id.

- Require Authentication: true
- Require proper authorization: Current User must be the host of the group, or
  the user whose participance is being deleted
- Request

  - Method: DELETE
  - URL: /api/challenges/:challengeId/participant
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "userId": 1
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Successfully deleted participance from challenge"
    }
    ```

- Error response: Couldn't find an Challenge with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Challenge not found"
    }
    ```

- Error response: Participance does not exist for this User

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Participance not found"
    }
    ```

### Delete a Challenge

Delete an existing challenge.

- Require Authentication: true
- Require proper authorization: Challenge must belong to the current user
- Request

  - Method: DELETE
  - URL: /api/challenges/:challengeId
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

- Error response: Couldn't find a Challenge with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Challenge not found"
    }
    ```

## COMMUNITIES

### Get all of the Current User's Communities

Return all the Communities that the current user is in.

- Require Authentication: false
- Request

  - Method: GET
  - URL: /api/communities/members/:memberId
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Communities": [
        {
          "id": 1,
          "memberId": 1,
          "name": "Exercise Group",
          "description": "we support each other in our exercise journey",
          "createdAt": "2023-07-01 20:39:36",
          "updatedAt": "2023-07-01 20:39:36"
        }
      ]
    }
    ```

### Get all Communities

Return all the Communities.

- Require Authentication: false
- Request

  - Method: GET
  - URL: /api/communities
  - Body: none

- Successful Response:

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Communities": [
        {
          "id": 1,
          "name": "Exercise Group",
          "description": "we support each other in our exercise journey",
          "createdAt": "2023-07-01 20:39:36",
          "updatedAt": "2023-07-01 20:39:36"
        }
      ]
    }
    ```

### Get all community members

Get all members of a community

- Require Authentication: false
- Request

  - Method: GET
  - URL: /api/community/memberships
  - Body: none

- Successful Respone:

  - Status Code: 200
  - Headers:
  - Content-Type: application/json
    -Body:

  ```json
  {
    "Members": [
      {
        "id": 1,
        "username": "mellow",
        "status": "officer"
      },
      {
        "id": 2,
        "username": "danibuva",
        "status": "member"
      }
    ]
  }
  ```

- Error response: Couldn't find a Community with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Community not found"
    }
    ```

### Create a Communitiy

Create and return a new community.

- Require Authentication: true
- Request

  - Method: POST
  - URL: /api/communities/new
  - Body:

    ```json
    {
      "name": "Exercise Group",
      "description": "we support each other in our exercise journey",
      "private": false
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "name": "Exercise Group",
      "description": "we support each other in our exercise journey",
      "private": false,
      "createdAt": "2023-07-01 20:39:36",
      "updatedAt": "2023-07-01 20:39:36"
    }
    ```

- Error response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "name": "Name must be less than 18 characters", // required
        "description": "Description must be less than 500 characters", // required
        "private": "Private is required"
      }
    }
    ```

### Request to join/Join community

Endpoint used to join a community.

- Require Authentication: true
- Request

  - Method: POST
  - URL: /api/communities/:communityId
  - Body: none

- Successful Response: For private communities

  - Status Code: 200

  - Headers:

    - Content-Type: application/json
      -Body:

    ```json
    {
      "memberId": 2,
      "status": "pending"
    }
    ```

- Successful Response: For public communities

  - Status Code: 200

  - Headers:

    - Content-Type: application/json
      -Body:

    ```json
    {
      "memberId": 2,
      "status": "member"
    }
    ```

- Error response: Couldn't find a Community with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Community not found"
    }
    ```

- Error response: Current User is already an accepted member of the group

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "User is already a member of the community"
    }
    ```

### Change a community member's status

Update and return a list of members

- Require Authentication: true
- Require proper authorization: Community must belong to the current user/ current user must be an officer
- Request

- Method: PUT
- URL: /api/communities/:communityId/memberships/:membershipId
- Headers:
  - Content-Type: application/json
- Body:

  ```json
  {
    "status": "officer"
  }
  ```

- Successful Response

  - Status Code: 200
  - Headers:

    - Content-Type: application/json
      Body:

    ```json
    {
      "id": "1",
      "communityId": "1",
      "memberId": "2",
      "status": "officer"
    }
    ```

- Error response: If changing the membership status to "pending".

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validations Error",
      "errors": {
        "status": "Cannot change a membership status to pending"
      }
    }
    ```

- Error response: Couldn't find a User with the specified memberId

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation Error",
      "errors": {
        "memberId": "User not found"
      }
    }
    ```

- Error response: Couldn't find a community with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Community not found"
    }
    ```

- Error response: If membership does not exist

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Membership between the user and the community does not exist"
    }
    ```

### Delete membership to a Community specified by id

Delete a membership to a community specified by id.

- Require Authentication: true
- Require proper authorization: Current User must be the owner of the community, or
  the user whose membership is being deleted
- Request

  - Method: DELETE
  - URL: /api/communities/:communityId/membership
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "memberId": 2
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Successfully deleted membership from community "
    }
    ```

- Error response: Couldn't find a User with the specified memberId

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation Error",
      "errors": {
        "memberId": "User not found"
      }
    }
    ```

- Error response: Couldn't find a Community with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Community couldn't be found"
    }
    ```

- Error response: Membership does not exist for this User

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Membership not found"
    }
    ```

### Edit a Community

Update and return an existing community.

- Require Authentication: true
- Require proper authorization: Community must belong to the current user/ current user must be an officer
- Request

  - Method: PUT
  - URL: /api/communities/:communityId
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "name": "Exercise Group!",
      "description": "We support each other in our exercise journey.",
      "image": "image url",
      "banner": "banner url"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "name": "Exercise Group!",
      "description": "We support each other in our exercise journey.",
      "image": "image url",
      "banner": "banner url",
      "createdAt": "2023-07-01 20:39:36",
      "updatedAt": "2023-07-01 20:39:36"
    }
    ```

- Error response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "name": "Name must be less than 18 characters",
        "description": "Description must be less than 500 characters"
      }
    }
    ```

- Error response: Couldn't find a Community with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Community not found"
    }
    ```

### Delete a Community

Delete an existing Community.

- Require Authentication: true
- Require proper authorization: Community must belong to the current user
- Request

  - Method: DELETE
  - URL: /api/communities/:communityId
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

- Error response: Couldn't find a Community with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Community not found"
    }
    ```

## Community Goals (posts)

### Get all goals of a community

Return all goals of a community specified by its id.

- Require Authentication: false
- Request

  - Method: get
  - URL: /api/communities/:communityId/goals
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Goals": [
        {
          "id": 1,
          "userId": 1,
          "title": "Mile time of 5 minutes",
          "body": "I am going to train to lower my mile time ",
          "image": "image url",
          "doit": 25,
          "completed": false,
          "createdAt": "2023-07-01 20:39:36",
          "updatedAt": "2023-07-01 20:39:36"
        }
      ]
    }
    ```

- Error response: Couldn't find a commnity with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Community not found"
    }
    ```
