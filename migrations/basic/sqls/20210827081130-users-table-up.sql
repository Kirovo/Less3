CREATE TYPE status AS ENUM ('active','complete');

CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    firstName VARCHAR(57), 
    lastName VARCHAR(57), 
    password_digest VARCHAR(255)
);