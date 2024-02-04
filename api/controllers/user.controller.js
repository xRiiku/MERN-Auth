import User from '../models/user.model.js'
import { errorHandler } from '../utils/error.js'
import bcryptjs from 'bcryptjs'

export const test = (req, res) => {
    res.json({
        message: 'API is working!'
    })
}

//Update user

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id){ //Si las id del usuario y del token no coinciden, devolverá un error
        //Esto es para que nadie pueda cambiar los datos de usuario de otro usuario que no sea el suyo propio.
        return next(errorHandler(401, 'You can update only your account!'))
    }
    try{
        if (req.body.password !== req.body.confirmPassword) {
            return next(errorHandler(400, 'Passwords do not match'))
        } else {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set:{
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture
                }
            },
            { new: true}
        )
        const { password, ...rest } = updatedUser._doc
        res.status(200).json(rest)
    }catch (error){
        next(error)
    }
}

//delete user

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id){
        return next(errorHandler(401, 'You can delete only your account'))
    }
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('User has been deleted...')
    }catch (error){
        next(error)
    }
}