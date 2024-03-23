import { Model } from "mongoose"


export type IMonth = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';
export type IAcademicTitle = "Autumn"| "Summer" | "Fall";
export type IAcademicCode = "01" | "02" | "03";


export type IAcademicSemester= {
  title: IAcademicTitle,
  year?: string;
  code: IAcademicCode;
  startMonth: IMonth;
  endMonth: IMonth;
}

export type IAcademicFilter = {
  searchTerm?: string;
}

export type AcademicSemesterModel = Model<IAcademicSemester>;