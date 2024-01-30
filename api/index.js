import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
/* Instalamos nodemon para no tener que parar y arrancar el servidor en cada cambio que hagamos */
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'

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
app.use(express.json()) //Permite que JSON sea la entrada (de datos) de nuestro backend


/* Asignamos un puerto al servidor */
app.listen(3000, ()=>{
    console.log('Server listening on port 3000')
})

/* endPoint */
app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)