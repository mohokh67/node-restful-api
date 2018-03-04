# RESTful API with Node.js and Express


## API

### Products
All products APIs are under `/products` route.

* Create a product with Post request in `/product` route:
 ```
{
	"name": "Washing machine",
	"price": "250.00"
}
```

* Request format for updating a product with `/products/:{productId}` with `PATCH` method:
```
[
    { "propName":"name", "value": "Washing Machine" },
    { "propName":"price", "value": "333" }
]
```

## Orders
Creat a new order: `POST` request to `/orders` with this data:
```
{
	"productId": "5a9507f2f5a1db1b17f7e06e",
	"quantity": "2"
}
```