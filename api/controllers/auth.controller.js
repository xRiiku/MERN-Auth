import User from "../modules/user.model.js"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { errorHandler } from '../utils/error.js'

/* Registro de usuario en la base de datos */
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body //obtenemos los datos desde el body
    const hashedPassword = bcryptjs.hashSync(password, 10) // encriptamos la contraseña
    const newUser = new User({username, email, password: hashedPassword})
    try{
        await newUser.save()
        res.status(201).json({message: "User creeated successfully"})
    }catch(error){
        next(error) //Obtenemos el error de nuestro middleWare
    }
}

/* Login de usuario */
export const signin = async (req, res, next) => {
    const { email, password } = req.body //obtenemos el email y el password desde el body.
    try{
        const validUser = await User.findOne({ email }) //Busca en la base de datos el email introducido en el input
        if (!validUser) return next(errorHandler(404, 'User not found'))
        const validPassword = bcryptjs.compareSync(password, validUser.password) //Comparamos la password que el usuario ha puesto en el input con la de la base de datos
        if (!validPassword) return next(errorHandler(401, 'Wrong credentials'))
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET) //Creamos el token con la ID del usuario
        const { password: hashedPassword, ...rest } = validUser._doc //Hacemos que el token no devuelva la password del usuario (por seguridad)
        //_doc se utiliza para destructurar los datos del usuario
        const expiryDate = new Date(Date.now() + 3600000) // 1 hora
        res
            .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
            .status(200)
            .json(rest) //Si no hay error (status(200)), devolvemos los datos (Sesion global)
        //Añadimos el token a las cookies del navegador con httpOnly a true para que ninguna aplicación de terceros pueda modificar el token
    }catch(error){
        next(error) //Obtenemos el error de nuestro middleWare
    }
}