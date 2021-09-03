                              README
________________________________________________________________

# Introduction
The following work respond to the project of the cours : "Creating an 
API with PostgreSQL and Express" of the "Full Stack Javascript 
Developer" Nanodegree Program.

The workspace include several actions required to run the code properly:
- Connect to the database
- Launch the application and migrations
- Test app with jasmine and endpoints with Postman


# Connect to the database
## Setup a server
This project need a database hosted by PostgreSQL:
- Make sure that PostgreSQL is correctly installed on your computer
othewise please install it.
- Will installing or will creating a new server, please configure the
following informations:

* Username : "postgres"
* Hostname : "localhost" (127.0.0.1)
* Port : 3000
* Database : "full_stack_dev"
* Password : "Cyber123!"

## Import the database
- To be able to use psql commands from PostgreSQL, add the
directory to /bin folder of PostgreSQL installation in the "Path" 
environement variable on you computer.
- On the CLI of your code editor, run the following commands:

> cat DB.txt | psql -h localhost -p 3000 -U postgres full_stack_dev
> _Enter the password : "Cyber123!"._
> psql -d full_stack_dev -h localhost -p 3000 -U postgres
> _Enter the password : "Cyber123!"._


## Check if it worked
- Enter the command "\dt". 5 rows should appear. Otherwise the database
can still be setup manually with the same configuraton.
- Disconnect from the database "\q"


# Application
## Run
The application can be run throught Typescript with te following command :

> npm run start

.. or throught Javascript:

> node ./dist/server

## Environement variable

Here are the environement variables used for the app

POSTGRES_HOST=localhost
POST_PORT=3000
POSTGRES_DB=full_stack_dev
POSTGRES_TEST_DB=full_stack_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=Cyber123!
ENV=dev
BCRYPT_PASSWORD=I_am_a_password_yay_:)
SALT_ROUNDS=10
TOKEN_SECRET=123456789

## Migration
Migration depend on the position of generated sql files in migration 
directory wich depend of the timestamp in their names.

Tables like 'order_products' or 'orders' cannot be created before
tables like 'products' or 'users' due to foreign key restictions.
So migration is set to be built throught 2 folders (advanced, basic)

to execute migration:
- create a database where you want to test the migration
> db-migrate db:create full_stack_test
- run the following commands to create empty tables:
> db-migrate --env test up:basic
> db-migrate --env test up:advanced
- run the following commands to remove them:
> db-migrate --env test down:basic
> db-migrate --env test down:basic
- Drop the database:
> db-migrate db:drop full_stack_test

This process is automaticaly generated for testing

Note: it is important to drop the database to reuse the migration due to ENUM type 
generation wich throw an error if it is generated a second time

# Test
## Ports
- Port for database : 3000
- Port for application : 2000

## Jasmine test
Test protocol is managed throught the following command:
- the environement variable 'ENV' is modified to testing with:
> $env:ENV = 'test' 
- then :
> npm run test
- to return to developping environement :
> $env:ENV = 'dev' 

Then models are tested and should return a sucessful test

## Endpoint test
Endpoint are test with Postman.

A Postman json file is accessible in the root of the project:

=> ProjectLess3.postman_collection.json

You can import it on Postman it will open a ProjectLess3 Collection
that you can use to test endpoints of the application.