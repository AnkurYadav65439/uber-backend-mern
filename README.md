# Backend API Documentation

## Endpoints

### POST /users/register

#### Description
This endpoint is used to register a new user.

#### Request
- **URL**: `/users/register`
- **Method**: `POST`
- **Headers**: 
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
  }

Notes
The email field must be a valid email address.
The fullname.firstname field must be at least 3 characters long.
The password field must be at least 6 characters long.
The response includes a JWT token for authentication purposes.

Response
Success Response:

  Code: 201 Created
  Content:
  ```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id_here",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}

Error Response:
  Code: 400 Bad Request
  Content:
  ```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be atleast 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "Password must be atleast 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
 
  Code: 500 Internal Server Error
  Content:
  ```json
{
  "message": "Internal server error"
}




### POST /users/login

#### Description
This endpoint is used to log in an existing user.

#### Request
- **URL**: `/users/login`
- **Method**: `POST`
- **Headers**: 
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }

Success Response:

  Code: 200 OK
  Content:
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id_here",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "socketId": null
    }
  }


Error Responses:
  Code: 400 Bad Request
  Content:
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Password must be atleast 6 characters long",
        "param": "password",
        "location": "body"
      }
    ]
  }

  Code: 500 Internal Server Error
  Content:
  ```json
  {
    "message": "Internal server error"
  }


Notes
The email field must be a valid email address.
The password field must be at least 6 characters long.
The response includes a JWT token for authentication purposes.