import User from "../modules/user.model.js"
import bcryptjs from 'bcryptjs'

/* Crea un usuario en la base de datos */
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