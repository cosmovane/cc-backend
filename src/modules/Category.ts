import { Sequelize, Model } from 'sequelize';

import { db } from '../config/database.js';

interface CategoryAttributes {
  id?: number;
  name: string;
}

interface CategoryModel extends CategoryAttributes {}

export const Category = db.define<CategoryAttributes, CategoryModel>(
  'category',
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }
);
