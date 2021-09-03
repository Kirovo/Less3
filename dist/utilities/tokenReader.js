"use strict";
// This file creates a identification middleware
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing token genrator and request properties
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Manage the access thanks to the given token from the Authorization header
var tokenReader = function (req, res, next) {
    try {
        // Getting the identification token from the Authorization header
        var authorizationHeader = req.headers.authorization;
        // Getting the token from the Authorization header from format: "Bearer (token)"
        var token = authorizationHeader.split(' ')[1];
        // Identify the received token
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (err) {
        res.status(401);
        res.json("Invalid token " + err);
        next();
    }
};
// Make available the use of the token reader
exports.default = tokenReader;
