"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing environement variable manipulation module and postgreSQL database module
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
// Getting environement variables
dotenv_1.default.config();
// Initializing environement variables as variables
var _a = process.env, POSTGRES_HOST = _a.POSTGRES_HOST, POSTGRES_DB = _a.POSTGRES_DB, POSTGRES_USER = _a.POSTGRES_USER, POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD, POSTGRES_TEST_DB = _a.POSTGRES_TEST_DB, ENV = _a.ENV;
// Initializing port as number from environment variables
var POST_PORT = process.env.POST_PORT;
// Creatting a client
var client = new pg_1.Pool();
// Giving the client appropriate database to work with
// depending on of worjing environement (dev,test)
if (ENV === 'test') {
    client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_TEST_DB,
        port: POST_PORT,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}
if (ENV === 'dev') {
    client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        port: POST_PORT,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}
// Exporting the client to work with it
exports.default = client;
