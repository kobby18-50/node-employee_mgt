
import express from 'express'
import dotenv from 'dotenv'
import 'express-async-errors'

dotenv.config()

// db import
import connectDB from './db/connect.js'

// user routes import
import userRoutes from './routes/user.route.js'

// admin user import
import adminRoutes from './routes/user.admin.route.js'

// department route
import departmentRoutes from './routes/department.js'

// no-auth route
import noAuthRoutes from './routes/no-auth-routes.js'

// user priviledges import
import userPriviledgesRoute from './routes/user.priviledges.route.js'

// middleware imports
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
import unauthorizedMiddleWare from './middleware/unauthorized.js'


const app = express()

// express json
app.use(express.json())

// routes 
app.get('/', (req,res) => {
    res.send('homepage')
})

// admin routes
app.use('/admin', adminRoutes)


//no auth route
app.use('/no-auth', noAuthRoutes)

// user priviledges
app.use('/user/auth', userPriviledgesRoute)

// user routes
app.use('/user', unauthorizedMiddleWare , userRoutes)


// department route
app.use('/department', unauthorizedMiddleWare ,departmentRoutes )



// middleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 3000

// start func
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()