# Code Climate

[![Maintainability](https://api.codeclimate.com/v1/badges/fa3fc0912abcb80056d3/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/Groa-be/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/fa3fc0912abcb80056d3/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/Groa-be/test_coverage)

# API Documentation

#### Backend delpoyed at [AWS Elastic Beanstalk](https://api.groa.us) <br>

## Getting started

To get the server running locally:

- Clone this repo
- **npm install** to install all required dependencies
- **npm run server** to start the local server
- **npm test** to start server using testing environment

### Express

Express

- RESTful API
- Straightforward sever construction
- Stable and widely used
- Can be built upon

## Endpoints

#### User Routes

| Method | Endpoint                                     | Access Control | Description                                                                                                                                                                                                                                      |
| ------ | -------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| POST   | `/api/users/register`                        |                | Creates a new user.                                                                                                                                                                                                                              |
| POST   | `/api/users/login`                           |                | Logs in an existing user.                                                                                                                                                                                                                        |
| POST   | `/api/users/:user_id/uploading`              |                | Uploads zip file from Letterboxd, unzips, parses and cleans each file and adds them to their respective tables in the database. If a movie with the same name and year exists on the users account it will update variable information in place. |
| POST   | `/api/users/:user_id/add-movie-rating`       |                | Adds a rating object to the groa_users_ratings table, If a movie with the same name and year exists on the users account it will update the rating information in place.                                                                         |
| GET    | `/api/users/:user_id/get-movies`             |                | Returns a json file of all the movies in the database.                                                                                                                                                                                           |
| GET    | `/api/users/:user_id/recommendations`        |                | POSTs the user_id to the data science recommendation endpoint and then returns the newly added recommendations from the database or a prompt to add more reviews.                                                                                |
| GET    | `/api/users/:user_id/recommended`            |                | Returns the latest recommendation from the database.                                                                                                                                                                                             |
| GET    | `/api/users/:user_id/recommendation-history` |                | Returns an array of all recommendations found in the database.                                                                                                                                                                                   |

# Data Model

#### USERS

---

```
{
  user_id: INTEGER, INCREMENTS
  user_name: STRING, UNIQUE
  password: STRING,
  has_letterboxd: BOOLEAN,
  has_imdb: BOOLEAN,
  last_login: DATE,
  email: STRING
}
```

#### USERS WATCHED

---

```
{
  user_id: INTEGER, INCREMENTS
  movie_id: STRING
  date: DATE
  source: STRING
}
```
#### USERS WATCHLIST

---

```
{
  id: INTEGER
  user_id: INTEGER, INCREMENTS
  movie_id: STRING
  date: DATE
  source: STRING
}
```
#### USERS WILL NOT WATCHLIST

---

```
{
  id: INTEGER
  user_id: INTEGER, INCREMENTS
  movie_id: STRING
  date: DATE
}
```

#### MOVIES

---

```
{
  movie_id: STRING
  title_type: MOVIE
  primary_title: STRING
  original_title: STRING
  is_adult: BOOLEAN
  start_year: DATE: YYYY
  end_year: DATE: YYYY
  runtime_minutes: INTEGER
  genres: STRING
  poster_url: STRING
  avarage_rating: REAL
  num_votes: INTEGER
  original_language: STRING
  description: STRING
  trailer_url: STRING
}
```

#### REVIEWS/RATINGS

---

##### RATING

---

```
{
  rating_id: INTEGER
  user_id: INTEGER
  movie_id: STRING
  date: DATE
  rating: REAL
  source: STRING
}
```

##### REVIEW

---

```
{
  review_id: INTEGER
  user_id: INTEGER
  movie_id: STRING
  date: DATE
  review_title: STRING
  review_text: STRING
  tags: STRING
  source: STRING
}
```

#### RECOMMENDATIONS

---

##### /:ID/RECOMMENDATIONS

---

```
    {
      movie_id: STRING,
      score: INTEGER,
      title: STRING,
      year: INTEGER,
      genres: [
        STRING
      ],
      poster_url: STRING
    }
```

#### UPLOADING

---

```

{
  user_id: INTEGER
  user_name: STRING
  ratings: [
    ...
  ],
  reviews: [
    ...
  ],
  watched: [
    ...
  ],
  watchlist: [
    ...
  ]
}
```

---

## Actions

`add()` -> Creates and returns a new user.

`findBy(username)` -> Returns a single user by user_name.

`getUserById(id)` -> Returns a single user by ID.

`findUsers()` -> Return all users and their corresponding ID.

`findRatings()` -> Returns the user_groa_ratings for the logged in user.

`addRating()` -> Takes ratings.csv file or rating object from zip upload and adds to user_groa_ratings,

`addReview()` -> Takes reviews.csv file from zip upload and adds to user_groa_reviews.

`addToWatchList()` -> Takes watchlist.csv file from zip upload and adds to user_groa_watchlist.

`addToWatched()` -> Takes watched.csv file from zip upload and adds to user_letterboxd_watched.

`getUserData(id)` -> Returns all user_groa_ratings, \_reviews, and \_watchlist, and user_letteroxd_watched items found in the database for a given user_id.

`getLatestRecommendations(id)` -> Returns the latest recommendations found in the database.

`getAllRecommendations(id)` -> Returns all recommendatios associated with the users account.

## Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:
  
 _ DATABASE_URL - This is the url for thre Groa database needed to connect to our postgresQL on RDS
_ TESTING_DB_URL - This is the local test databaase url, it can be changed to whatever you need for your local setup
_ RECOMMENDATION_URL - This is the url for the data science ratings recommender, needed for generating recommendations
_ JWT_SECRET - The secret used to assign encode tokens for authentication
_ TOKEN_EXP - Variable in which the token expires, can be set to anything you like
_ HASHING_ROUNDS - adds rounds to the hashing

The respective values for these variables can be found on the Elastic Beanstalk environment in Configuration > Software > Environment properties

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](https://github.com/Lambda-School-Labs/Groa-fe/blob/master/README.md) for details on the front end of our project.
see [Data Science](https://github.com/Lambda-School-Labs/Groa-ds/blob/master/README.md) for details on
the Data Science of our project.
