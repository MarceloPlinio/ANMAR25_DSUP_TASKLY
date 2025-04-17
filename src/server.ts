import express from 'express'
import taskRoutes from './routes/taskRoutes'

const app = express()
app.use(express.json())

app.use('/api', taskRoutes)

app.listen(3000, () => {
  console.log('Server Listening in http://localhost:3000')
})
