import { DataType } from 'sequelize-typescript';
import { db } from '../config/database.js';
export const Category = db.define('category', {
    name: {
        type: DataType.STRING,
        allowNull: false,
    },
});
//# sourceMappingURL=Category.js.map