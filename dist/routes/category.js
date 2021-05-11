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
categoryRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = req.query['order'] ? 'DESC' : 'ASC';
        yield Category.findAll({
            order: [['id', order]],
        })
            .then((categories) => {
            res.status(200);
            res.json(categories);
        })
            .catch(() => {
            res.status(404);
            res.end(JSON.stringify({ message: 'Not Found' }));
        });
    }
    catch (error) {
        res.status(400);
        res.end(JSON.stringify({ error: error.message }));
    }
}));
categoryRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const category = yield Category.findOne({
            where: { id },
        });
        if (category === null) {
            res.status(404);
            res.end(JSON.stringify({ message: 'Not Found' }));
        }
        else {
            res.status(200);
            res.json(category).end();
        }
    }
    catch (error) {
        res.status(400);
        res.end(JSON.stringify({ error: error.message }));
    }
}));
categoryRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        yield Category.create({ name }).then((newCategory) => {
            res.status(201);
            res.json(newCategory).end();
        });
    }
    catch (error) {
        res.status(400);
        res.end(JSON.stringify({ error: error.message }));
    }
}));
categoryRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const category = yield Category.update({ name }, { returning: true, where: { id: req.params.id } });
        if (category[0] === 0) {
            res.status(404);
            res.end(JSON.stringify({ message: 'Not Found' }));
        }
        else {
            res.status(200);
            res.json(category).end();
        }
    }
    catch (error) {
        res.status(400);
        res.end(JSON.stringify({ error: error.message }));
    }
}));
categoryRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const category = yield Category.destroy({
            where: { id: id },
        });
        if (category === 0) {
            res.status(404);
            res.end(JSON.stringify({ message: 'Not Found' }));
        }
        else {
            res.status(204);
            res.end(JSON.stringify({ message: 'Category deleted' }));
        }
    }
    catch (error) {
        res.status(400);
        res.end(JSON.stringify({ error: error.message }));
    }
}));
export default categoryRouter;
//# sourceMappingURL=category.js.map