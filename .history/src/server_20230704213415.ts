import mongoose from 'mongoose'
import app from './app'
import config from './config'
async function main() {
  try {
    await mongoose.connect(config.database_url as string)

    // check the datbase is connected or not through console
    console.log('Database has been connected')

    // listening the port with this function
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`)
    })
  } catch (error) {
    console.log('database wont be able to connect', error)
  }
}
main()
