import dotenv from 'dotenv'
dotenv.config()

const baseConfig = {
    port: process.env.PORT,
    dbUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET
}

export default baseConfig
