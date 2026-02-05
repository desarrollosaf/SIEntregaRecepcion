import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import User from '../models/saf/users'
import UserBase from '../models/user'
import UsersSafs from '../models/saf/s_usuario'
import jwt, { JwtPayload } from 'jsonwebtoken';
import SUsuario from '../models/saf/s_usuario';
import dotenv from 'dotenv';
import { dp_fum_datos_generales } from '../models/fun/dp_fum_datos_generales'

export const ReadUser = async (req: Request, res: Response): Promise<any> => {
    const listUser = await User.findAll();
    return res.json({
        msg: `List de categoría encontrada exitosamenteeeee`,
        data: listUser
    });
}

export const LoginUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { rfc, password } = req.body;
    // let passwordValid = false;
    let user: any = null;

    user = await User.findOne({
        where: { rfc: rfc },
        
    })


    if (!user) {
        return res.status(400).json({
            msg: `Usuario no existe con el rfc ${rfc}`
        })
    }
       console.log('rango '+user.SUsers) 
    if(user.SUsers.rango == 1 || user.SUsers.rango ==2 || user.SUsers.rango ==3){
        console.log('jefe');
    }else{
        console.log('operativo');
    } 

    let passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
        return res.status(402).json({
            msg: `Password Incorrecto => ${password}`
        })
    }
 
    const accessToken = jwt.sign(
        { rfc: rfc },
        process.env.SECRET_KEY || 'TSE-Poder-legislativo',
        { expiresIn: '2h' }
    );

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 2 * 60 * 60 * 1000,
        path: '/',
    });

    

    return res.json({ user })
}

export const getCurrentUser = async (req: Request, res: Response) => {
    const user = (req as any).user;
    const datos_user = await SUsuario.findOne({
        where: { N_Usuario: user.rfc },
        attributes: [
            "Nombre",
        ],
        raw: true
    });
    
    res.json({
        rfc: user.rfc,
        nombre:datos_user
    });
};

export const cerrarsesion = async (req: Request, res: Response): Promise<any> => {
    res.clearCookie('accessToken', {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
    });

    return res.status(200).json({ message: 'Sesión cerrada' });
};








