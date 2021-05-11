import express from 'express';

import { Item } from '../modules/Item.js';

const itemRouter = express.Router();

itemRouter.get('/', async (req, res) => {
  try {
    await Item.findAll()
      .then((items) => {
        res.status(200);
        res.json(items);
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

itemRouter.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const item = await Item.findOne({
      where: { id },
    });
    if (item === null) {
      res.status(404);
      res.end(JSON.stringify({ message: 'Not Found' }));
    } else {
      res.status(200);
      res.json(item).end();
    }
  } catch (error) {
    res.status(400);
    res.end(JSON.stringify({ error: error.message }));
  }
});

itemRouter.post('/', async (req, res) => {
  try {
    const { description, done, listId, completedAt } = req.body;
    await Item.create({
      description,
      done,
      listId,
      completedAt,
    }).then((newItem) => {
      res.status(201);
      res.json(newItem).end();
    });
  } catch (error) {
    res.status(400);
    res.end(JSON.stringify({ error: error.message }));
  }
});

itemRouter.put('/:id', async (req, res) => {
  try {
    const { description, done, listId, completedAt } = req.body;
    const item = await Item.update(
      { description, done, listId, completedAt },
      { returning: true, where: { id: req.params.id } }
    );
    if (item[0] === 0) {
      res.status(404);
      res.end(JSON.stringify({ message: 'Not Found' }));
    } else {
      res.status(200);
      res.json(item).end();
    }
  } catch (error) {
    res.status(400);
    res.end(JSON.stringify({ error: error.message }));
  }
});

itemRouter.delete('/:id', async (req, res) => {
  try {
    res.status(204);
    const id = req.params.id;
    const item = await Item.destroy({
      where: { id: id },
    });
    if (item === 0) {
      res.status(404);
      res.end(JSON.stringify({ message: 'Not Found' }));
    } else {
      res.status(204);
      res.end(JSON.stringify({ message: 'Item deleted' }));
    }
  } catch (error) {
    res.status(400);
    res.end(JSON.stringify({ error: error.message }));
  }
});

export default itemRouter;
