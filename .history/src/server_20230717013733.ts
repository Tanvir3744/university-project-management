import mongoose from 'mongoose'
import app from './app'
import config from './config'
import  {logger, errorLogger}  from './shared/logger'
import Server from "
async function main() {

  let server:Server;
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

  process.on("unhandledRejection", (err) => {
    console.log("unhandled rejection we are closing the server ...")
    if (server) {
      server.close(() => {
        errorLogger.error(err)
      })
    }
    process.exit(1)
  })

}
main()