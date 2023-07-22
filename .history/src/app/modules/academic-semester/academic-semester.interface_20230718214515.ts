import { Model } from "mongoose"

export type IAcademicSemester= {
  title: string
  year: string
  code: string
  startMonth: string
  endMonth: string
}

export type AcademicSemesterModel = Model<IAcademicSemester>;