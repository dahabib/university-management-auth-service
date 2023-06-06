import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import usersRouter from './app/modules/users/users.route'

const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application Route
app.use('/api/v1/users/', usersRouter)

//Testing
app.get('/', async (req: Request, res: Response) => {
  res.send(`Application started successfully!`)
})

export default app
