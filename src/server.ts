import mongoose from 'mongoose'
import app from './app'
import config from './config/index'

const bootstrap = async (): Promise<void> => {
  try {
    await mongoose.connect(config.database_url as string)
    console.log(`Database connected successfully!`)
    app.listen(config.port, () => {
      console.log(`Application is listening on port ${config.port}`)
    })
  } catch (err) {
    console.log(`Failed to cennect with database!`, err)
  }
}

bootstrap()
