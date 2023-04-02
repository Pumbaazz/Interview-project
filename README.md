[TOC]

# Interview-project

## Database design

![image info](./Movie%20-%20public.png)

Front-end: Using ReactJS, npm, axios...

Back-end: Using ASP.NET Web API, Entity Framework Core

Database: PostgreSQL

Web API architect: MVC using Entity Framework, code first create database.

## Api design

### User Controller

#### Login

URL: `api/login`

Method: POST

**Request body**

```json
{
  "email": "admin@gmail.com",
  "password": "password"
}
```

**Response**: Status code 200 OK

**Exception**:

|Error code     |Error message  |
| ------------- |-------------  |
| 401 | User not found. Please try again. |

#### Sign Up

URL: `api/sign-up`

Method: POST

**Request body**

```json
{
  "name": "admin",
  "email": "admin@gmail.com",
  "password": "password"
}
```

**Response**: Status code 200 OK

**Exception:**

|Error code     |Error message  |
| ------------- |-------------  |
| 409           | User is existed. Please try again. |
| 401 | Input something wrong. Please try again. |

### Movie Controller
#### Get all movies
URL: `api/get-movies`

Method: GET

**Request body**

N/A

**Response**: Status code 200 OK, List movie

Response sample:
```json
[
  {
    "movieId": 1,
    "title": "The Shawshank Redemption",
    "path": "https://traditiononline.org/wp-content/uploads/2019/11/13-Best-Shawshank.jpg",
    "likes": 14
  },
  {
    "movieId": 3,
    "title": "The Dark Knight",
    "path": "https://m.media-amazon.com/images/I/91KkWf50SoL._AC_SL1500_.jpg",
    "likes": 6
  },
  {
    "movieId": 4,
    "title": "The Shawshank Redemption",
    "path": "https://traditiononline.org/wp-content/uploads/2019/11/13-Best-Shawshank.jpg",
    "likes": 18
  },
  {
    "movieId": 5,
    "title": "The Godfather",
    "path": "https://www.lab111.nl/wp-content/uploads/2022/01/TGF50_INTL_DIGITAL_PAYOFF_1_SHEET__NED.jpg",
    "likes": 15
  }
]
```

**Exception:**

|Error code     |Error message  |
| ------------- |-------------  |
| 400 | An error occurred. Please try again later. |

#### Like movies

URL: `api/like/{movieId}`

Method: PUT

**Request body**

N/A

**Response**: Status code 200 OK, movie modified

Response sample:
```json
{
  "movieId": 1,
  "title": "The Shawshank Redemption",
  "path": "https://traditiononline.org/wp-content/uploads/2019/11/13-Best-Shawshank.jpg",
  "likes": 15
}
```

**Exception:**

|Error code     |Error message  |
| ------------- |-------------  |
| 400 | An error occurred. Please try again later. |


#### Dislike movies

URL: `api/dislike/{movieId}`

Method: PUT

**Request body**

N/A

**Response**: Status code 200 OK, List movie

Response sample:
```json
{
  "movieId": 1,
  "title": "The Shawshank Redemption",
  "path": "https://traditiononline.org/wp-content/uploads/2019/11/13-Best-Shawshank.jpg",
  "likes": 14
}
```

**Exception:**

|Error code     |Error message  |
| ------------- |-------------  |
| 400 | An error occurred. Please try again later. |

## Demo video
https://youtu.be/lwnlNrCA0JA
