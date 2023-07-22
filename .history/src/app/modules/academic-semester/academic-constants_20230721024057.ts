import {
  IAcademicCode,
  IAcademicTitle,
  IMonth,
} from './academic-semester.interface'

export const academicMonths: IMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const academicCodes: IAcademicCode[] = ['01', '02', '03']
export const academicTitle: IAcademicTitle[] = ['Autumn', 'Summer', 'Fall']

export const academicSemesterAndCodeMapper: {
  [key: string]: string
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
}
