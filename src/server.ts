import express from 'express'
import taskRoutes from './routes/taskRoutes'
import noteRoutes from './routes/noteRoutes'

const app = express()
app.use(express.json())


app.use('/', taskRoutes)
app.use('/', noteRoutes) 

app.listen(3000, () => {
  console.log('Server Listening in http://localhost:3000')
})
