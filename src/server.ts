import mongoose from 'mongoose'
import dotEnv from './config/index.js'
import app from './app.js'

async function main() {
  try {
    await mongoose.connect(dotEnv.databaseURI as string)
    app.listen(dotEnv.port, () => {
      console.log(`app listening on port ${dotEnv.port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

main()
