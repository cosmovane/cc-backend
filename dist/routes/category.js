var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import { Category } from '../modules/Category.js';
const categoryRouter = express.Router();
categoryRouter.get('/', (req, res) => {
    try {
        res.status(200);
        return Category.findAll()
            .then((categories) => res.json(categories))
            .catch((err) => console.log(err));
    }
    catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});
categoryRouter.get('/:id', (req, res) => {
    try {
        const id = req.params.id;
        res.status(200);
        Category.findOne({
            where: { id },
        })
            .then((lists) => res.json(lists))
            .catch((err) => console.log(err));
    }
    catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});
categoryRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        res.status(201);
        const newCategory = yield Category.create({ name });
        return res.json(newCategory);
    }
    catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
}));
categoryRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        res.status(200);
        const newCategory = yield Category.update({ name }, { returning: true, where: { id: req.params.id } });
        return res.json(newCategory);
    }
    catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
}));
categoryRouter.delete('/:id', (req, res) => {
    try {
        res.status(204);
        const id = req.params.id;
        Category.destroy({
            where: { id: id },
        }).then((deletedCategory) => {
            res.json(deletedCategory);
        });
    }
    catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});
export default categoryRouter;
//# sourceMappingURL=category.js.map