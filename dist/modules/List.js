import { DataType } from 'sequelize-typescript';
import { db } from '../config/database.js';
export const List = db.define('list', {
    name: {
        type: DataType.STRING,
        allowNull: false,
    },
    categoryId: {
        type: DataType.INTEGER,
        allowNull: false,
    },
});
//# sourceMappingURL=List.js.map