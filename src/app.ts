import express, { Application } from "express"
import morgan from 'morgan'
import IndexRoutes from './routes/index.routes'
import PostRoutes from './routes/books.routes'
import UserRoutes from './routes/user.routes'
import LoginRoutes from './routes/login.routes'
import cors from 'cors'
export class App {

private app: Application

constructor(private port?: number | string) {
    this.app = express()
    this.setting()
    this.middlewares()
    this.routes()
}

setting() {
    this.app.set('port', this.port || process.env.port || 3000)
}

middlewares() {
    this.app.use(morgan('dev'))
    this.app.use(express.json())
    this.app.use(cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type']
    }))
}

routes() {
    this.app.use(IndexRoutes)
    this.app.use('/book', PostRoutes) //libro
    this.app.use('/users', UserRoutes) //usuarios
    this.app.use('/login', LoginRoutes) //login
}
async listen() {

    await this.app.listen(this.app.get('port'))
    console.log('Server on port', this.app.get('port'));
    

}
}