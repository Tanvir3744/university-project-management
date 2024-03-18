import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') }) // this line is for env file which is outside of src folder

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  default_student_pass: process.env.DEFAULT_STUDENT_PASS,
  default_admin_pass: process.env.DEFAULT_ADMIN_PASS,
  deafult_faculty_pass: process.env.DEFAULT_FACULTY_PASS,
}
