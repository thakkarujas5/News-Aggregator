# News-Aggregator

## API's

###  POST '/register'

This route takes in body parameters of:

 ```json
{
  "name": "Name of user to be registered",
  "email": "E-Mail of user to be registered",
  "password": "Password of user to be registered",
  
}
```

### POST '/login'

This route take in body paramters of email and password, validates it against the user stored in the DB and returns a JWT token to be 
sent in subsequent requests.

#### req
 ```json
{
  "email": "E-Mail of user to login",
  "password": "Password of user to login",
  
}
```

#### res

 ```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRoYWt5YWhvQG8uY29tIiwiaWF0IjoxNjgyNzY5Njk2LCJleHAiOjE2ODI3NzMyOTZ9.hVgANW1RfCWf77A3KqINh3-6IAyltJkQe47ubPgPdPg"
  
}
```


### PUT '/preferences'

This route is used to update the news preferences of the user. <br />

This api takes in one header information -  Authorization : Bearer [JWT Token]


#### req
 ```json
{
  "q": "Topic of interest of user",
}
```

### GET '/preferences'

This route is used to fetch all the news preferences of the user.<br />

This api takes in one header information -  Authorization : Bearer [JWT Token]

### DELETE '/preferences/:topic'

This api is used to delete a specific preference of the user.<br />

This api takes in one header information -  Authorization : Bearer [JWT Token]

### GET '/news'

This api is used to fetch all relevant articles based on the preferences of the user.<br />

This api takes in one header information -  Authorization : Bearer [JWT Token]
