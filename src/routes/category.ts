import express from 'express';

import { Category } from '../modules/Category.js';

const categoryRouter = express.Router();

categoryRouter.get('/', (req, res) => {
  try {
    return Category.findAll()
      .then((categories) => res.json(categories))
      .catch((err) => console.log(err));
  } catch (error) {
    throw new Error(error.message);
  }
});

categoryRouter.get('/:id', (req, res) => {
  try {
    const id = req.params.id;
    Category.findOne({
      where: { id },
    })
      .then((lists) => res.json(lists))
      .catch((err) => console.log(err));
  } catch (error) {
    throw new Error(error.message);
  }
});

categoryRouter.post('/', async (req, res) => {
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
  try {
    const id = req.params.id;
    Category.destroy({
      where: { id: id },
    }).then((deletedCategory) => {
      res.json(deletedCategory);
    });
  } catch (error) {
    throw new Error(error.message);
  }
});

export default categoryRouter;
