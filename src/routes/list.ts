import express from 'express';

import { List } from '../modules/List.js';

const listRouter = express.Router();

listRouter.get('/', async (req, res) => {
  try {
    await List.findAll()
      .then((lists) => {
        res.status(200);
        res.json(lists);
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

listRouter.get('/:id', async (req, res) => {
  try {
    res.status(200);
    const id = req.params.id;
    const list = await List.findOne({
      where: { id },
    });
    if (list === null) {
      res.status(404);
      res.end(JSON.stringify({ message: 'Not Found' }));
    } else {
      res.status(200);
      res.json(list).end();
    }
  } catch (error) {
    res.status(400);

    res.end(JSON.stringify({ error: error.message }));
  }
});

listRouter.post('/', async (req, res) => {
  try {
    res.status(201);
    const { name, categoryId } = req.body;
    await List.create({ name, categoryId }).then((newList) => {
      res.status(201);
      res.json(newList).end();
    });
  } catch (error) {
    res.status(400);

    res.end(JSON.stringify({ error: error.message }));
  }
});

listRouter.put('/:id', async (req, res) => {
  try {
    const { name, categoryId } = req.body;
    const list = await List.update(
      { name, categoryId },
      { returning: true, where: { id: req.params.id } }
    );
    if (list[0] === 0) {
      res.status(404);
      res.end(JSON.stringify({ message: 'Not Found' }));
    } else {
      res.status(200);
      res.json(list).end();
    }
  } catch (error) {
    res.status(400);

    res.end(JSON.stringify({ error: error.message }));
  }
});

listRouter.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const list = await List.destroy({
      where: { id: id },
    });
    if (list === 0) {
      res.status(404);
      res.end(JSON.stringify({ message: 'Not Found' }));
    } else {
      res.status(204);
      res.end(JSON.stringify({ message: 'List deleted' }));
    }
  } catch (error) {
    res.status(400);

    res.end(JSON.stringify({ error: error.message }));
  }
});

export default listRouter;
