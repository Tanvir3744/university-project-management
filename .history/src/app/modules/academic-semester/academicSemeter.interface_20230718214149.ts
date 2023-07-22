import { Model } from "mongoose"

type IAcademicSemester= {
  title: string
  year: string
  code: string
  startMonth: string
  endMonth: string
}

type AcademicSemesterModel = Model<IAcademicSemester>;
export default IUser;