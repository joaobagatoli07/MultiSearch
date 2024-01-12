import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { normalizeData } from './controllers/searchController';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Adicione o middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, '/')));

// Rota para lidar com requisições para o index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/search', async (req: Request, res: Response) => {
  try {
    const searchText = req.query.text as string;
    const results = await normalizeData(searchText);
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});


