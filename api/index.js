import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config() //leer la configuración del archivo .env
/* Conexión a la base de datos */
mongoose.connect(process.env.MONGO) // datos de la base de datos en el archivo .env, variable MONGO
.then(()=>{
    console.log("Connected to MongoDB")
})
.catch((err)=>{
    console.log(err)
})

const app = express() // Inicializamos el servidor

/* Asignamos un puerto al servidor */
app.listen(3000, ()=>{
    console.log('Server listening on port 3000')
})