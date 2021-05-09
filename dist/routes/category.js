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
categoryRouter.get('/', (req, res) => Category.findAll()
    .then((categories) => res.json(categories))
    .catch((err) => console.log(err)));
categoryRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    Category.findOne({
        where: { id },
    })
        .then((lists) => res.json(lists))
        .catch((err) => console.log(err));
});
categoryRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('req: ', req.body);
    const { name } = req.body;
    try {
        const newCategory = yield Category.create({ name });
        return res.json(newCategory);
    }
    catch (error) {
        throw new Error(error.message);
    }
}));
categoryRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        const newCategory = yield Category.update({ name }, { returning: true, where: { id: req.params.id } });
        return res.json(newCategory);
    }
    catch (error) {
        throw new Error(error.message);
    }
}));
categoryRouter.delete('/:id', (req, res) => {
    const id = req.params.id;
    Category.destroy({
        where: { id: id },
    }).then((deletedCategory) => {
        res.json(deletedCategory);
    });
});
export default categoryRouter;
//# sourceMappingURL=category.js.map