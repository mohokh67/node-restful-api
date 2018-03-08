# RESTful API with Node.js and Express
This is my third personal node project. I have learned so much with this project and it was so fun. This project covers product, order and authentication in a simple way. This project is using `Node.js` as the main language, `express` as framework and `mongodb` for storage. I may expand the project to use `MySQL` for DB in future.

I am also practicing my `ES6` coding style. So I tried my best to use the latest coding style I knew by the time of this project. I also used `babel` for code compatibility.

For testing purposed I used [postman](https://www.getpostman.com) and `nodemon`.

## Installation and run
Make sure `Node.js` and `NPM` are installed in your system. Navigate to the project directory and then follow these steps:
- `npm install` to install all packages and dependencies. You need dev packages as well in you dev machine.
- Rename `config/config.example.js` to `config.js` and update the file for mongo db login credentials
- `npm start` which boot up the server and wait for port 3000. You can change this port in `config/config.js` file
- use [postman](https://www.getpostman.com) app and navigate to one of the [routes](#API) with `http://localhost:3000` to send the request and see the response with in the application.

## List of the technologies and packeages:
- Node.js
- Express
- bcrypt (Encrypt password)
- body-parser (Parse URL and body)
- multer (Upload file)
- morgan (Log)
- mongoose (Mongo DB)
- jsonwebtoken (JWT) Token for authentication
- uniqid (Create a unique ID for uploading product files)


## API
Here are the list of all entries to this system in three groups:
### Users
All users routes begin with `user/*` and some of them require [authentication](#Authentication) token which means you need to send the token in header of them:


- `/login` with `POST` method is to login to the system and use the API's. This should be the first entry point for all routes which requires `auth` middleware. If authentication is successfull, the system will return the token and you can use this token for future reuests.
```
{
	"email": "moho@khaleqi.me",
	"password": "pass1234"
}
```

- `/:userId` with `DELETE` method is for removing a user with given user id. This request needs `auth` middleware to protect the route and only be accessible only for logged in users. This routes shouldn't be in production as a logged in user can remove any user.

- `/signup` with `POST` method is to create a user. This route should not be in production as users should not be able to register and use the system as they wish. I only wrote this one for development and testing.
```
{
	"email": "moho@khaleqi.me",
	"password": "pass1234"
}
```
The system only accept unique email address. The password will be encrypted with one way `bcrypt` encryption package.

### Products
All orders routes begin with `products/*` and some of them require [authentication](#Authentication) token which means you need to send the token in header of them:

- `/` with `GET` method is to find all products.
- `/` with `POST` method is to create a product. This request needs `auth` middleware to protect the route and only be accessible only for logged in users. The next middleware is `multer` for uploading a product image. This is the format of the post request:
 ```
{
	"name": "Washing machine",
	"price": "249.99"
	"productImage": "123.jpg"
}
```
#### note:
 The order of middlewares are important and will be run form left to right. So the auth middleware run first and then upload file.

- `/:id` with `GET` method is to find a product with given product id.
-  `/:id` with `PATCH` method is to update a product with given product id. This request needs `auth` middleware to protect the route and only be accessible only for logged in users.

```
[
    { "propName":"name", "value": "Washing Machine" },
    { "propName":"price", "value": "313.13" }
]
```

You can update one or all fields with this request. in "propName" you should put the exact field name.
- `/:id` with `DELETE` method is for removing a product with given product id. This request needs `auth` middleware to protect the route and only be accessible only for logged in users.
### Orders
All orders routes begin with `orders/*` and require [authentication](#Authentication) token which means you need to send the token in header for all of these requests:

- `/` with `GET` method which will show all orders.
- `/:id` with `GET` method is to find an order with given order id.
- `/:id` with `DELETE` method is for removing an order with given order id.
- `/` with `POST` method is for creating an order as bellow:
```
{
	"productId": "5a9507f2f5a1db1b17f7e06e",
	"quantity": "2"
}
```


## Authentication
[JSON Web Token](https://jwt.io) ([npm link](https://www.npmjs.com/package/jsonwebtoken)) takes care of the creating token after login and then check the authentication over some of routes as a middleware to protected those routes.

`app\api\middleware\auth.js` is the file which cover this middleware and sit in the express routes to protect them. In **products** and **orders** routes, `auth` middleware is present in some of routes.

#### Note:
- Token should be sent in header with `Authorization` field for verify. The value of field should be prefix with `Bearer [token]`. Toekn shouldn't be sent with the body(Form data). Check this [Stack overflow](https://stackoverflow.com/questions/42966193/bearer-before-token-in-jwt#answer-42966303) for more info.

```
Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o
```
- Make sure to update and choose a stronger key for `JWT_KEY` in `config\config.js` for production.

- Verify your token in [jwt.io](https://jwt.io) link.

