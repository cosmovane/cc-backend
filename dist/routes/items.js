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
import { Item } from '../modules/Item.js';
const itemRouter = express.Router();
itemRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Item.findAll()
            .then((items) => {
            res.status(200);
            res.json(items);
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
itemRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const item = yield Item.findOne({
            where: { id },
        });
        if (item === null) {
            res.status(404);
            res.end(JSON.stringify({ message: 'Not Found' }));
        }
        else {
            res.status(200);
            res.json(item).end();
        }
    }
    catch (error) {
        res.status(400);
        res.end(JSON.stringify({ error: error.message }));
    }
}));
itemRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { description, done, listId, completedAt } = req.body;
        yield Item.create({
            description,
            done,
            listId,
            completedAt,
        }).then((newItem) => {
            res.status(201);
            res.json(newItem).end();
        });
    }
    catch (error) {
        res.status(400);
        res.end(JSON.stringify({ error: error.message }));
    }
}));
itemRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { description, done, listId, completedAt } = req.body;
        const item = yield Item.update({ description, done, listId, completedAt }, { returning: true, where: { id: req.params.id } });
        if (item[0] === 0) {
            res.status(404);
            res.end(JSON.stringify({ message: 'Not Found' }));
        }
        else {
            res.status(200);
            res.json(item).end();
        }
    }
    catch (error) {
        res.status(400);
        res.end(JSON.stringify({ error: error.message }));
    }
}));
itemRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(204);
        const id = req.params.id;
        const item = yield Item.destroy({
            where: { id: id },
        });
        if (item === 0) {
            res.status(404);
            res.end(JSON.stringify({ message: 'Not Found' }));
        }
        else {
            res.status(204);
            res.end(JSON.stringify({ message: 'Item deleted' }));
        }
    }
    catch (error) {
        res.status(400);
        res.end(JSON.stringify({ error: error.message }));
    }
}));
export default itemRouter;
//# sourceMappingURL=items.js.map