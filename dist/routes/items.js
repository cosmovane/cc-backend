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
itemRouter.get('/', (req, res) => {
    try {
        Item.findAll()
            .then((items) => res.json(items))
            .catch((err) => console.log(err));
    }
    catch (error) {
        throw new Error(error.message);
    }
});
itemRouter.get('/:id', (req, res) => {
    try {
        const id = req.params.id;
        Item.findOne({
            where: { id },
        })
            .then((items) => res.json(items))
            .catch((err) => console.log(err));
    }
    catch (error) {
        throw new Error(error.message);
    }
});
itemRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { description, done, listId, completedAt } = req.body;
        const newItem = yield Item.create({
            description,
            done,
            listId,
            completedAt,
        });
        return res.json(newItem);
    }
    catch (error) { }
}));
itemRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { description, done, listId, completedAt } = req.body;
        const newItem = yield Item.update({ description, done, listId, completedAt }, { returning: true, where: { id: req.params.id } });
        return res.json(newItem);
    }
    catch (error) {
        throw new Error(error.message);
    }
}));
itemRouter.delete('/:id', (req, res) => {
    try {
        const id = req.params.id;
        Item.destroy({
            where: { id: id },
        }).then((deletedItem) => {
            res.json(deletedItem);
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
});
export default itemRouter;
//# sourceMappingURL=items.js.map