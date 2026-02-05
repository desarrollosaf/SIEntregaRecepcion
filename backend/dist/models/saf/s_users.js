"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../database/connection"));
class SUsers extends sequelize_1.Model {
}
SUsers.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: 'id'
    },
    username: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        field: 'username'
    },
    password: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
        field: 'password'
    },
    salt: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
        field: 'salt'
    },
    email: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
        field: 'email'
    },
    id_user: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        field: 'id_user'
    },
    level: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        field: 'level'
    },
    rango: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        field: 'rango'
    },
}, {
    sequelize: connection_1.default,
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
});
exports.default = SUsers;
