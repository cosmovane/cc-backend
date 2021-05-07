import express from 'express';
import path from 'path';

import { db } from './config/database.js';
import categoryRouter from './routes/category.js';

const app = express();

db.authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(`Error: ${err}`));

app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => res.send('INDEX'));
app.use('/category', categoryRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
