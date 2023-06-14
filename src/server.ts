import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { logger, errorLogger } from './shared/logger'

const bootstrap = async (): Promise<void> => {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info(`Database connected successfully!`)
    app.listen(config.port, () => {
      logger.info(`Application is listening on port ${config.port}`)
    })
  } catch (err) {
    errorLogger.error(`Failed to cennect with database!`, err)
  }
}

bootstrap()
