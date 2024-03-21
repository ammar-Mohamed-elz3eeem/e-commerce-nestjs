## Description

[Nest](https://github.com/) framework TypeScript starter repository.

## Endpoints

https://friendy-social-bc47307e1168.herokuapp.com/users/555451

- /users
  - POST / add new user to website => body {firstName, lastName, email, password, type: 'seller' || 'buyer', address?, userImage?}
  - POST /login authenticate new user to website => body { email, password } => return { status: 'success', result: token }
  - GET / gets all users in website
  - GET /:id get user using its id
  - PATCH /:id edit user info -> require Authorization header = Bearer ${token}
  - DELETE /:id edit user info -> require Authorization header = Bearer ${token}

- /orders
  - GET / = gets all orders in website that have been closed (pastOrders) for current logged in user
  - GET /:id = get order using its id
  - DELETE /:id = delete order using its id
  - POST / = add new order to website { status, userId }
  - PUT /:id/product = add product to order
  - DELETE /:id/product = remove product from order
  - PATCH /:id/ = complete order after checkout

- /products
  - POST / add new product -> body {name, description, price, stockQuantity, catId, prodImage} only seller account type can add product
  - GET / get all products
  - GET /:id get single product using its id
  - DELETE /:id delete single product using its id
  - PATCH /:id delete single product using its id

- /categories
  - POST / add new category -> body { name, catImage }
  - GET / get all categories
  - GET /:id get single category
  - DELETE /:id delete single category
  - PATCH /:id edit single category

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - [Ammar Massoud](mailto:ammar@wpkama.com)

## License

Nest is [MIT licensed](LICENSE).
