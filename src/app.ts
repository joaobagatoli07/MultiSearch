// Import required modules and dependencies
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { normalizeData } from './controllers/searchController';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';

// Load Swagger/OpenAPI specification from a YAML file
const swaggerSpecs = yaml.load('./swagger-definition.yaml');

// Create an instance of the Express application
const app = express();

// Define the port for the server to listen on
const PORT = 3000;

// Use middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Serve static files from the 'layout' and 'controllers' directories
app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, '../layout')));
app.use(express.static(path.join(__dirname, './controllers')));

// Set up Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Define a route for handling requests to the root path ('/')
app.get('/', (req, res) => {
  // Send the 'index.html' file when the root path is accessed
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Define a route for handling POST requests to '/api/search'
app.post('/api/search', async (req: Request, res: Response) => {
  try {
    // Extract the search text from the request body
    const searchText = req.body.text as string; 

    // Call the 'normalizeData' function with the search text and send the results as a JSON response
    const results = await normalizeData(searchText);
    res.json(results);
  } catch (error) {
    console.error(error);
    // Handle errors by logging them to the console and sending a 500 Internal Server Error response
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});