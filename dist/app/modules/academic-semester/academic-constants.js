"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchAbleFields = exports.academicSemesterAndCodeMapper = exports.academicTitle = exports.academicCodes = exports.academicMonths = void 0;
exports.academicMonths = [
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
];
exports.academicCodes = ['01', '02', '03'];
exports.academicTitle = ['Autumn', 'Summer', 'Fall'];
exports.academicSemesterAndCodeMapper = {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
};
exports.searchAbleFields = ['title', 'code', 'startMonth', "endMonth"];
