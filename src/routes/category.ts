import express from 'express';

import { Category } from '../modules/Category.js';

const categoryRouter = express.Router();

categoryRouter.get('/', (req, res) =>
  Category.findAll()
    .then((categories) => res.json(categories))
    .catch((err) => console.log(err))
);

categoryRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  Category.findOne({
    where: { id },
  })
    .then((lists) => res.json(lists))
    .catch((err) => console.log(err));
});

categoryRouter.post('/', async (req, res) => {
  console.log('req: ', req.body);
  const { name } = req.body;

  try {
    const newCategory = await Category.create({ name });
    return res.json(newCategory);
  } catch (error) {
    throw new Error(error.message);
  }
});

categoryRouter.put('/:id', async (req, res) => {
  const { name } = req.body;

  try {
    const newCategory = await Category.update(
      { name },
      { returning: true, where: { id: req.params.id } }
    );
    return res.json(newCategory);
  } catch (error) {
    throw new Error(error.message);
  }
});

categoryRouter.delete('/:id', (req, res) => {
  const id = req.params.id;
  Category.destroy({
    where: { id: id },
  }).then((deletedCategory) => {
    res.json(deletedCategory);
  });
});

export default categoryRouter;
