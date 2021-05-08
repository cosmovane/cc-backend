import express from 'express';

import { List } from '../modules/List.js';

const listRouter = express.Router();

listRouter.get('/', (req, res) =>
  List.findAll()
    .then((lists) => res.json(lists))
    .catch((err) => console.log(err))
);

listRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  List.findOne({
    where: { id },
  })
    .then((lists) => res.json(lists))
    .catch((err) => console.log(err));
});

listRouter.post('/', async (req, res) => {
  const { name, categoryId } = req.body;

  try {
    const newList = await List.create({ name, categoryId });
    return res.json(newList);
  } catch (error) {
    throw new Error(error.message);
  }
});

listRouter.put('/:id', async (req, res) => {
  const { name, categoryId } = req.body;

  try {
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
  const id = req.params.id;
  List.destroy({
    where: { id: id },
  }).then((deletedList) => {
    res.json(deletedList);
  });
});

export default listRouter;
