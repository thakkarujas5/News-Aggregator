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

 ```json
{
  "email": "E-Mail of user to login",
  "password": "Password of user to login",
  
}
```