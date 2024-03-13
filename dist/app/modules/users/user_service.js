"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = require("./user.model");
const index_1 = __importDefault(require("../../../config/index"));
const user_utils_1 = require("../../../utils/user.utils");
const apiErrors_1 = __importDefault(require("../../../errors/apiErrors"));
const academic_semester_models_1 = require("../academic-semester/academic-semester.models");
const mongoose_1 = __importDefault(require("mongoose"));
const student_model_1 = require("../student/student.model");
const http_status_1 = __importDefault(require("http-status"));
// create user service
const createStudent = (student, user) => __awaiter(void 0, void 0, void 0, function* () {
    // set user id;
    // set default pasword
    if (!user.password) {
        user.password = index_1.default.default_student_pass;
    }
    user.role = 'student';
    const academic_semester = yield academic_semester_models_1.AcademicSemester.findById(student.academicSemester).lean();
    let newUserAllData = null;
    const session = yield mongoose_1.default.startSession();
    //generate auto incremental id ;
    try {
        session.startTransaction();
        //generate student id ;
        const id = yield (0, user_utils_1.generateStudentId)(academic_semester);
        user.id = id;
        student.id = id;
        //creating new student into database using session storage
        const createNewStudent = yield student_model_1.Student.create([student], { session });
        //if createnewstudent is empty will throw this error...
        if (!createNewStudent.length) {
            throw new apiErrors_1.default(http_status_1.default.BAD_REQUEST, 'failed to create student');
        }
        // push new students id into user.student which is coming from user model...
        user.student = createNewStudent[0]._id;
        // creating new user while we already created a new student...
        const newUser = yield user_model_1.User.create([user], { session });
        console.log(newUser, 'this is new user');
        if (!newUser.length) {
            throw new apiErrors_1.default(http_status_1.default.BAD_REQUEST, 'failed to create user');
        }
        newUserAllData = newUser[0];
        console.log(newUserAllData, 'this is new user all data');
        // after creating these whole stuff we need to commit the entire work ....
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        // if there is any error thrown for any reason ....
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    if (newUserAllData) {
        newUserAllData = yield user_model_1.User.findOne({ id: newUserAllData.id }); /* .populate({
          path: 'student',
          populate: [
            {
              path: 'academicSemester',
            },
            {
              path: 'academicDepartment',
            },
            {
              path: 'academicFaculty',
            },
          ],
        }) */
    }
    console.log(newUserAllData === null || newUserAllData === void 0 ? void 0 : newUserAllData.id, 'this is new users all data id');
    return newUserAllData;
    /*   // create user into database;
    const createdUser = await User.create(user)
    // if the user throw eny error (validation)
    if (!createdUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'failed to create user')
    }
    return createdUser */
});
exports.UserService = {
    createStudent,
};
