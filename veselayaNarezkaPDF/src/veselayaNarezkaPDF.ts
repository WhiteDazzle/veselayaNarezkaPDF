require('dotenv').config()
import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import profile from './routes/profile'
import file from './routes/file'

const app:Express = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(fileUpload())
app.get('/', (req:Request, res:Response) => {
    res.send('Hello World!')
})

profile(app)

file(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
