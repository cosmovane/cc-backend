import express from 'express';

import { Category } from '../modules/Category.js';

const categoryRouter = express.Router();

categoryRouter.get('/', async (req, res) => {
  try {
    await Category.findAll()
      .then((categories) => {
        res.status(200);
        res.json(categories);
      })
      .catch(() => {
        res.status(404);
        res.end(JSON.stringify({ message: 'Not Found' }));
      });
  } catch (error) {
    res.status(400);
    res.end(JSON.stringify({ error: error.message }));
  }
});

categoryRouter.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findOne({
      where: { id },
    });
    if (category === null) {
      res.status(404);
      res.end(JSON.stringify({ message: 'Not Found' }));
    } else {
      res.status(200);
      res.json(category).end();
    }
  } catch (error) {
    res.status(400);
    res.end(JSON.stringify({ error: error.message }));
  }
});

categoryRouter.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    await Category.create({ name }).then((newCategory) => {
      res.status(201);
      res.json(newCategory).end();
    });
  } catch (error) {
    res.status(400);
    res.end(JSON.stringify({ error: error.message }));
  }
});

categoryRouter.put('/:id', async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.update(
      { name },
      { returning: true, where: { id: req.params.id } }
    );
    if (category[0] === 0) {
      res.status(404);
      res.end(JSON.stringify({ message: 'Not Found' }));
    } else {
      res.status(200);
      res.json(category).end();
    }
  } catch (error) {
    res.status(400);
    res.end(JSON.stringify({ error: error.message }));
  }
});

categoryRouter.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.destroy({
      where: { id: id },
    });
    if (category === 0) {
      res.status(404);
      res.end(JSON.stringify({ message: 'Not Found' }));
    } else {
      res.status(204);
      res.end(JSON.stringify({ message: 'Category deleted' }));
    }
  } catch (error) {
    res.status(400);
    res.end(JSON.stringify({ error: error.message }));
  }
});

export default categoryRouter;
