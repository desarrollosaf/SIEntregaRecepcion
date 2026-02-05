import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import sequelize from '../../database/connection'; 

class SUsers extends Model<
  InferAttributes<SUsers>,
  InferCreationAttributes<SUsers>
> {
  declare id: CreationOptional<number>;
  declare username: string | null;
  declare password: string | null;
  declare salt: string | null;
  declare email: string | null;
  declare id_user: string;
  declare level: number | null;
  declare rango: number | null;
}

SUsers.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      field: 'id'
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'username'
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'password'
    },
    salt: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'salt'
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'email'
    },
    id_user: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'id_user'
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'level'
    },
    rango: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'rango'
    },
  },
  {
    sequelize,
    tableName: 's_users',
    timestamps: false,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        name: 'id',
        using: 'BTREE',
        fields: [{ name: 'id' }],
      },
    ],
  }
);



export default SUsers;