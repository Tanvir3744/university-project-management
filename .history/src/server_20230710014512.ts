import mongoose from 'mongoose'
import app from './app'
import config from './config'
import  {logger, errorlogger}  from './shared/logger'
async function main() {
  try {
    await mongoose.connect(config.database_url as string)

    // check the datbase is connected or not through console
    logger.info('Database has been connected')

    // listening the port with this function
    app.listen(config.port, () => {
     logger.info(`Example app listening on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error('database wont be able to connect', error)
  }
}
main()
