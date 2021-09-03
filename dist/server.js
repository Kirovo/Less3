"use strict";
// This file serve the application
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing modules to work with endpoints and json format
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
// Importing routes
var users_1 = __importDefault(require("./handlers/users"));
var products_1 = __importDefault(require("./handlers/products"));
var orders_1 = __importDefault(require("./handlers/orders"));
var dashboards_1 = __importDefault(require("./handlers/dashboards"));
// Listenning to the app to endpoints
var app = express_1.default();
var port = 2000;
app.use(body_parser_1.default.json());
app.get('/', function (_req, res) {
    res.send('Hello World!');
});
// Listening to the app from the different routes
users_1.default(app);
products_1.default(app);
orders_1.default(app);
dashboards_1.default(app);
// Launching the app on localhost:2000
app.listen(port, function () {
    console.log("listening app on: " + port);
});
