import mongoose from 'mongoose'
import app from './app'
import config from './config'
import  {logger, errorLogger}  from './shared/logger'
import { Server } from "http"



// for uncaught exception error of server
process.on("uncaughtException", (err) => {
  console.log("uncaught exception error detected", err);
  process.exit(1);
})


let server: Server;

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


  /* for gracefully server stop  */
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });

} 
main()

// to sending signals to server if there any issues are arrives
process.on("SIGTERM", () => {
  logger.info("sigterm recieved");
  if (server) {
    server.close()
  }
}) 




