"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_route_1 = __importDefault(require("./routes/product.route"));
// Set up
const app = (0, express_1.default)();
// Middleware
app.use((req, res, next) => {
    if (req.url === "/secure-page") { // Block access to secure url
        res.status(403).send("You are not allowed to visit...");
    }
    console.log(`Request made to ${req.url} at ${new Date()}`);
    next(); // Proceed to next middleware or route handler
});
app.use(express_1.default.json()); // Allow incoming json data
// Routes
app.use('/api/products', product_route_1.default);
// Start server
app.listen(3500, () => {
    console.log('Server is running on port 3500...');
});
