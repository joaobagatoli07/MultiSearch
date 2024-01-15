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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import required modules and dependencies
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const searchController_1 = require("./controllers/searchController");
// Create an instance of the Express application
const app = (0, express_1.default)();
// Define the port for the server to listen on
const PORT = 3000;
// Use middleware to parse incoming JSON requests
app.use(body_parser_1.default.json());
// Serve static files from the 'layout' and 'controllers' directories
app.use(express_1.default.static(path_1.default.join(__dirname)));
app.use(express_1.default.static(path_1.default.join(__dirname, '../layout')));
app.use(express_1.default.static(path_1.default.join(__dirname, './controllers')));
// Define a route for handling requests to the root path ('/')
app.get('/', (req, res) => {
    // Send the 'index.html' file when the root path is accessed
    res.sendFile(path_1.default.join(__dirname, 'index.html'));
});
// Define a route for handling POST requests to '/api/search'
app.post('/api/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract the search text from the request body
        const searchText = req.body.text;
        // Call the 'normalizeData' function with the search text and send the results as a JSON response
        const results = yield (0, searchController_1.normalizeData)(searchText);
        res.json(results);
    }
    catch (error) {
        console.error(error);
        // Handle errors by logging them to the console and sending a 500 Internal Server Error response
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
