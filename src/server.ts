import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { logger, errorLogger } from './shared/logger'
import { Server } from 'http'

process.on('uncaughtException', error => {
  errorLogger.error(error)
  process.exit(1)
})

let server: Server

const bootstrap = async (): Promise<void> => {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info(`Database connected successfully!`)
    server = app.listen(config.port, () => {
      logger.info(`Application is listening on port ${config.port}`)
    })
  } catch (err) {
    errorLogger.error(`Failed to cennect with database!`, err)
  }

  process.on('unhandledRejection', error => {
    errorLogger.error("Unhandled rejection detected, we're closing server... ")
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

bootstrap()

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received')
  if (server) {
    server.close()
  }
})
