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

* Request format fro updating a product with `/products/:{productId}` with `PATCH` method:
```
[
    { "propName":"name", "value": "Washing Machine" },
    { "propName":"price", "value": "333" }
]
```