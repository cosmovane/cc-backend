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
listRouter.get('/', (req, res) => List.findAll()
    .then((lists) => res.json(lists))
    .catch((err) => console.log(err)));
listRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    List.findOne({
        where: { id },
    })
        .then((lists) => res.json(lists))
        .catch((err) => console.log(err));
});
listRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, categoryId } = req.body;
    try {
        const newList = yield List.create({ name, categoryId });
        return res.json(newList);
    }
    catch (error) {
        throw new Error(error.message);
    }
}));
listRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, categoryId } = req.body;
    try {
        const newList = yield List.update({ name, categoryId }, { returning: true, where: { id: req.params.id } });
        return res.json(newList);
    }
    catch (error) {
        throw new Error(error.message);
    }
}));
listRouter.delete('/:id', (req, res) => {
    const id = req.params.id;
    List.destroy({
        where: { id: id },
    }).then((deletedList) => {
        res.json(deletedList);
    });
});
export default listRouter;
//# sourceMappingURL=list.js.map