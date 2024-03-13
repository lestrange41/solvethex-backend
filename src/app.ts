import express, { Application } from "express"
import morgan from 'morgan'
import IndexRoutes from './routes/index.routes'
import PostRoutes from './routes/post.routes'
import UserRoutes from './routes/user.routes'

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

}

routes() {
    this.app.use(IndexRoutes)
    this.app.use('/posts', PostRoutes) //post
    this.app.use('/users', UserRoutes) //usuarios
}
async listen() {

    await this.app.listen(this.app.get('port'))
    console.log('Server on port', this.app.get('port'));
    

}
}