import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const connect = async () => {
    try {
        mongoose.connect(process.env.DB_CONNECT_URL)
        const { connection } = await mongoose

        connection.once('open', () => {
            console.log('Database connected')
        })
        connection.on('error', (err) => {
            console.error('Database connection error:', err.message)
        })

        } catch (err) {
            console.error('Error connecting to the database:', err.message)
        }
    }

export { connect }    