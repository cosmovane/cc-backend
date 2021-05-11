import express from 'express';

import { List } from '../modules/List.js';

const listRouter = express.Router();

listRouter.get('/', (req, res) => {
  try {
    List.findAll()
      .then((lists) => res.json(lists))
      .catch((err) => console.log(err));
  } catch (error) {
    throw new Error(error.message);
  }
});

listRouter.get('/:id', (req, res) => {
  try {
    const id = req.params.id;
    List.findOne({
      where: { id },
    })
      .then((lists) => res.json(lists))
      .catch((err) => console.log(err));
  } catch (error) {
    throw new Error(error.message);
  }
});

listRouter.post('/', async (req, res) => {
  try {
    const { name, categoryId } = req.body;
    const newList = await List.create({ name, categoryId });
    return res.json(newList);
  } catch (error) {
    throw new Error(error.message);
  }
});

listRouter.put('/:id', async (req, res) => {
  try {
    const { name, categoryId } = req.body;
    const newList = await List.update(
      { name, categoryId },
      { returning: true, where: { id: req.params.id } }
    );
    return res.json(newList);
  } catch (error) {
    throw new Error(error.message);
  }
});

listRouter.delete('/:id', (req, res) => {
  try {
    const id = req.params.id;
    List.destroy({
      where: { id: id },
    }).then((deletedList) => {
      res.json(deletedList);
    });
  } catch (error) {
    throw new Error(error.message);
  }
});

export default listRouter;
