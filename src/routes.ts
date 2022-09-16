import express, { Request, Response } from 'express';
import cors from 'cors';
import MongoDB from './mongoDB';

const app = express();
const PORT = 3000;
const db = new MongoDB();
app.use(cors());
app.use(express.json());

app.get('/', async (req: Request, res: Response) => res.send('Hello World!'));

app.get('/filmes', async (req: Request, res: Response) => {
  await db.connect();
  const response = await db.find({});
  return res.json(response);
});

app.post('/filmes', async (req: Request, res: Response) => {
  await db.connect();
  const response = await db.insertFilme(req.body);
  return res.json(response);
});

app.delete('/filmes', async (req: Request, res: Response) => {
  await db.connect();
  const response = await db.delete(req.body);
  return res.json(response);
});

app.listen(PORT, () => {
  console.log(`Runing http://localhost:${PORT}`);
});
