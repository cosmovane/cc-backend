import express from 'express';
import path from 'path';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { db } from './config/database.js';
import categoryRouter from './routes/category.js';
import itemRouter from './routes/items.js';
import listRouter from './routes/list.js';

const app = express();

db.authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(`Error: ${err}`));

app.use(express.json());
app.use(express.urlencoded());
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Hospital To-do',
      decription: 'To-do app for surgery department ',
      version: '1.0.0',
    },
  },
  apis: ['main.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (req, res) => res.send('INDEX'));
app.use('/categories', categoryRouter);
app.use('/lists', listRouter);
app.use('/items', itemRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
