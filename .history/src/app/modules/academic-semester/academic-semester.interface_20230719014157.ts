import { Model } from "mongoose"


export type Month = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';
export type AcademicTitle = "Autumn"| "Summer" | "Fall";
export type AcademicCode = "01" | "02" | "03";


export type IAcademicSemester= {
  title: AcademicTitle,
  year: number;
  code: AcademicCode;
  startMonth:Month;
  endMonth: Month;
}

export type AcademicSemesterModel = Model<IAcademicSemester>;