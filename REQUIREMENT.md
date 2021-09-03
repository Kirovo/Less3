# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
GET http://localhost:2000/products
- Show (args: product id)
GET http://localhost:2000/products/1
- Create (args: Product)[token required]
POST http://localhost:2000/products
- [OPTIONAL] Top 5 most popular products
GET http://localhost:2000/top 
- [OPTIONAL] Products by category (args: product category)
GET http://localhost:2000/category/two-hand

#### Users
- Index [token required]
GET http://localhost:2000/users
- Show (args: id)[token required]
GET http://localhost:2000/users/1
- Create (args: User)[token required]
POST http://localhost:2000/users

#### Orders
- Current Order by user (args: user id)[token required]
GET http://localhost:2000/current/1
- [OPTIONAL] Completed Orders by user (args: user id)[token required]
GET http://localhost:2000/completed/1

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

TABLE products (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(57), 
    price FLOAT(20), 
    category VARCHAR(57)
); 

 id | name | price | category

#### User
- id
- firstName
- lastName
- password

TYPE status AS ENUM ('active','complete');

TABLE users (
    id SERIAL PRIMARY KEY, 
    firstName VARCHAR(57), 
    lastName VARCHAR(57), 
    password_digest VARCHAR(255)
);
 id | firstname | lastname | password_digest

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

TABLE orders(
    id SERIAL PRIMARY KEY, 
    status status,
    user_id INT,
    FOREIGN KEY(user_id) REFERENCES users(id)
);

 id | status | user_id


TABLE order_products (
    id SERIAL PRIMARY KEY, 
    order_id integer REFERENCES orders(id), 
    product_id integer REFERENCES products(id), 
    quantity integer
);

 id | order_id | product_id | quantity 