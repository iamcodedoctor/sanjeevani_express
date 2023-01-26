import baseConfig from "./configs/baseConfig.js"
import app from "./loaders/app.js"
import connectToDatabase from "./loaders/dbConnection.js"

const port = baseConfig.port || 8080

connectToDatabase(baseConfig.dbUri);

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})