# Blog Cabin

Fullstack blog aggregation website. 

## Features
This application allows users to post interesting blogs or websites they have found.

A user can 'root' for a post they enjoy by clicking the thumbs up button.

When a user 'roots' a post their respective user id is added to an array containing all 'roots' for a specific post in the database.

When a user 'roots' a post they have already 'rooted' for, their user id is removed from the 'roots' array from the database and the overall 'roots' counts decreases.

Posts are automatically sorted by total number of 'roots' when the website is loaded. 

New user accounts can be created and passwords are stored in the database as a password hash using ```bcrypt```.

User authentification has been implemented via JSON web tokens. 

The token is automatically saved to the browser via local storage, to allow users to use the application without having to log in again.

## Technology Used

### Frontend
```React``` ```SASS``` ```Axios```

### Backend
```NodeJS``` ```Express```  ```MongoDB```


Don't feel like making an account?
Use the default user account. 

username: default

password: default

Please allow up to 30s for application to spin up.

[Frontend Code](https://github.com/jakefrancis/blogcabin-frontend)
