# Setup

1. Install Nodejs (verison 8 above) - need async support
2. Install dependencies - `npm install`
3. Install Postgresql
4. Create a new user for Postgresql
5. Open knexfile.js and update username and password
6. Go into psql cli to create database rover and rover_test
7. Run knex migrate:latest --env development to populate schema
8. Run knex seed:run --env development to load data
9. Run dev - `npm start`
10. Test - `npm test`

I am using postgresql to persist the relationship. There are 3 tables
Sitters + Owners + Owners_Sitters
There is a script that run to calculate sitter score, overall score and rating score then update the Sitters table. We run this script hourly to keep the data updated.
Ideally since we are having big data problem, we should use spark which is perfect for big data sorting and filtering.
