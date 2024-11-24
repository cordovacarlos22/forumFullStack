import express from 'express'
import { connect } from './config/database.js'

const PORT = process.env.PORT || 3000

const api = express()

api.use(express.json())

connect().then(() => {
    api.listen(PORT, () => {
        console.log(`Server running on port http://localhost:${PORT}`)
    })

})