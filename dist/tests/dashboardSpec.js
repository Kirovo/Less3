"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// This file tests dashboard models
//
//
// Importing module for order creation
var order_1 = require("../models/order");
var product_1 = require("../models/product");
var user_1 = require("../models/user");
var dashboard_1 = __importDefault(require("../services/dashboard"));
// Importing client to connect to the database and clear tables after use
var database_1 = __importDefault(require("../database"));
// Getting classes
var store = new dashboard_1.default();
var prod = new product_1.ProductStore();
var order = new order_1.OrderStore();
var user = new user_1.UserStore();
describe('Dashboard Queries', function () {
    // Creating Arrays to test with multiple datas
    var a = []; // For products
    var b = []; // For generated in the database top products
    var c = []; // For products generated in the database
    var e = []; // For generated in the database current orders
    // Creating active an complete orders
    var o = {
        id: 1,
        status: 'active',
        user_id: 1,
    };
    var no = {
        id: 1,
        status: 'complete',
        user_id: 1,
    };
    // Creating a user
    var u = {
        firstname: 'test',
        lastname: 'TEST',
        password: 'test',
    };
    // Generating multiple products wih the same category
    for (var i = 1; i <= 10; i++) {
        var p = {
            id: i,
            name: "test" + i,
            price: 50,
            category: 'test',
        };
        a.push(p);
    }
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var ord, _i, a_1, d, product, ordadd, topObj, currObj;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Generating datas in database
                //
                // Creating user and an active order
                return [4 /*yield*/, user.create(u)];
                case 1:
                    // Generating datas in database
                    //
                    // Creating user and an active order
                    _a.sent();
                    return [4 /*yield*/, order.create(o)];
                case 2:
                    ord = _a.sent();
                    _i = 0, a_1 = a;
                    _a.label = 3;
                case 3:
                    if (!(_i < a_1.length)) return [3 /*break*/, 7];
                    d = a_1[_i];
                    return [4 /*yield*/, prod.create(d)];
                case 4:
                    product = _a.sent();
                    return [4 /*yield*/, order.addProducts(ord.id, product.id, a.indexOf(d))];
                case 5:
                    ordadd = _a.sent();
                    topObj = {
                        product_id: product.id,
                        name: product.name,
                        total: String(ordadd.quantity),
                    };
                    currObj = {
                        name: product.name,
                        category: product.category,
                        price: product.price,
                        quantity: ordadd.quantity,
                        subtotal: product.price * ordadd.quantity,
                    };
                    // Adding different Objects to the expected Arrays
                    b.push(topObj);
                    c.push(product);
                    e.push(currObj);
                    _a.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 3];
                case 7: return [2 /*return*/];
            }
        });
    }); });
    it('should get top 5 products', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.topProducts()];
                case 1:
                    result = _a.sent();
                    // Reverse the array to match the order of creation in the data base
                    b.reverse();
                    expect(result).toEqual(b.slice(0, 5));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should get products by category', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.productByCategory('test')];
                case 1:
                    result = _a.sent();
                    expect(result).toEqual(c);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should get complete order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var usr, produc, or, compObj, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user.show('1')];
                case 1:
                    usr = _a.sent();
                    return [4 /*yield*/, prod.show('1')];
                case 2:
                    produc = _a.sent();
                    return [4 /*yield*/, order.create(no)];
                case 3:
                    or = _a.sent();
                    // Adding products following th previous data
                    return [4 /*yield*/, order.addProducts(or.id, produc.id, 16)];
                case 4:
                    // Adding products following th previous data
                    _a.sent();
                    compObj = {
                        order_id: or.id,
                        status: or.status,
                        firstname: usr.firstname,
                        lastname: usr.lastname,
                    };
                    return [4 /*yield*/, store.completedOrder('1')];
                case 5:
                    result = _a.sent();
                    expect(result).toEqual([compObj]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should get current order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.currentOrder('1')];
                case 1:
                    result = _a.sent();
                    expect(result).toEqual(e);
                    return [2 /*return*/];
            }
        });
    }); });
    // Clear table and sequence
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var conn2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    conn2 = _a.sent();
                    return [4 /*yield*/, conn2.query('DELETE FROM order_products')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, conn2.query('DELETE FROM orders')];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, conn2.query('DELETE FROM products')];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, conn2.query('DELETE FROM users')];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, conn2.query('ALTER SEQUENCE order_products_id_seq RESTART WITH 1;')];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, conn2.query('ALTER SEQUENCE orders_id_seq RESTART WITH 1;')];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, conn2.query('ALTER SEQUENCE products_id_seq RESTART WITH 1;')];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, conn2.query('ALTER SEQUENCE users_id_seq RESTART WITH 1;')];
                case 9:
                    _a.sent();
                    conn2.release();
                    return [2 /*return*/];
            }
        });
    }); });
});
