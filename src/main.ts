import express from 'express';
import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { db } from './config/database.js';
import categoryRouter from './routes/category.js';
import itemRouter from './routes/items.js';
import listRouter from './routes/list.js';
import swaggerSpec from './swagger.json';

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

db.authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(`Error: ${err}`));

app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => res.send('INDEX'));
app.use('/categories', categoryRouter);
app.use('/lists', listRouter);
app.use('/items', itemRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
