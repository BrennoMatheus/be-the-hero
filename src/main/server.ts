import app from './config/app'
import { createConnection } from 'typeorm'

createConnection()

app.listen(process.env.PORT || 3000, () => console.log(`server running at http://localhost:${process.env.PORT || 3000}`))
