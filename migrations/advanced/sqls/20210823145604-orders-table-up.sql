CREATE TABLE orders(
    id SERIAL PRIMARY KEY, 
    status status,
    user_id INT,
    FOREIGN KEY(user_id) REFERENCES users(id)
);