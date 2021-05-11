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
import { List } from '../modules/List.js';
const listRouter = express.Router();
listRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = req.query['order'] ? 'DESC' : 'ASC';
        yield List.findAll({
            order: [['id', order]],
        })
            .then((lists) => {
            res.status(200);
            res.json(lists);
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
listRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200);
        const id = req.params.id;
        const list = yield List.findOne({
            where: { id },
        });
        if (list === null) {
            res.status(404);
            res.end(JSON.stringify({ message: 'Not Found' }));
        }
        else {
            res.status(200);
            res.json(list).end();
        }
    }
    catch (error) {
        res.status(400);
        res.end(JSON.stringify({ error: error.message }));
    }
}));
listRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(201);
        const { name, categoryId } = req.body;
        yield List.create({ name, categoryId }).then((newList) => {
            res.status(201);
            res.json(newList).end();
        });
    }
    catch (error) {
        res.status(400);
        res.end(JSON.stringify({ error: error.message }));
    }
}));
listRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, categoryId } = req.body;
        const list = yield List.update({ name, categoryId }, { returning: true, where: { id: req.params.id } });
        if (list[0] === 0) {
            res.status(404);
            res.end(JSON.stringify({ message: 'Not Found' }));
        }
        else {
            res.status(200);
            res.json(list).end();
        }
    }
    catch (error) {
        res.status(400);
        res.end(JSON.stringify({ error: error.message }));
    }
}));
listRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const list = yield List.destroy({
            where: { id: id },
        });
        if (list === 0) {
            res.status(404);
            res.end(JSON.stringify({ message: 'Not Found' }));
        }
        else {
            res.status(204);
            res.end(JSON.stringify({ message: 'List deleted' }));
        }
    }
    catch (error) {
        res.status(400);
        res.end(JSON.stringify({ error: error.message }));
    }
}));
export default listRouter;
//# sourceMappingURL=list.js.map