"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cerrarsesion = exports.getCurrentUser = exports.LoginUser = exports.ReadUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_1 = __importDefault(require("../models/saf/users"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const s_usuario_1 = __importDefault(require("../models/saf/s_usuario"));
const s_users_1 = __importDefault(require("../models/saf/s_users"));
const ReadUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listUser = yield users_1.default.findAll();
    return res.json({
        msg: `List de categoría encontrada exitosamenteeeee`,
        data: listUser
    });
});
exports.ReadUser = ReadUser;
const LoginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { rfc, password } = req.body;
    // let passwordValid = false;
    let user = null;
    user = yield users_1.default.findOne({
        where: { rfc: rfc },
        include: [
            {
                model: s_users_1.default,
                as: 's_users'
            }
        ]
    });
    if (!user) {
        return res.status(400).json({
            msg: `Usuario no existe con el rfc ${rfc}`
        });
    }
    console.log('rango ' + user.s_users.rango);
    if (user.SUsers.rango == 1 || user.SUsers.rango == 2 || user.SUsers.rango == 3) {
        console.log('jefe');
    }
    else {
        console.log('operativo');
    }
    let passwordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordValid) {
        return res.status(402).json({
            msg: `Password Incorrecto => ${password}`
        });
    }
    const accessToken = jsonwebtoken_1.default.sign({ rfc: rfc }, process.env.SECRET_KEY || 'TSE-Poder-legislativo', { expiresIn: '2h' });
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 2 * 60 * 60 * 1000,
        path: '/',
    });
    return res.json({ user });
});
exports.LoginUser = LoginUser;
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const datos_user = yield s_usuario_1.default.findOne({
        where: { N_Usuario: user.rfc },
        attributes: [
            "Nombre",
        ],
        raw: true
    });
    res.json({
        rfc: user.rfc,
        nombre: datos_user
    });
});
exports.getCurrentUser = getCurrentUser;
const cerrarsesion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('accessToken', {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
    });
    return res.status(200).json({ message: 'Sesión cerrada' });
});
exports.cerrarsesion = cerrarsesion;
