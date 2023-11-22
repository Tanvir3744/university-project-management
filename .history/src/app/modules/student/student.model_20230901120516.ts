const student = new Schema<IStudent, StudentModel>({
    id: {
        type: String, 
        required: true, 
        unique: true, 
    },
    name: {
        type: {
            firstName: {
                type: String, 
                required: true, 
            },
            middleName: {
                type: String, 
            }, 
            lastName: {
                type: String, 
                required: true, 
            },
        },
    },

    gender: {
        type: String, 
        enum: ['male', "female"],
        required: true, 
    }, 
    dateOfBirth: {
        type: String, 
        required: true, 
    },
    email: {
        type: String, 
        unique: true, 
        required: true, 
    }, 
    contactNo: {
        type: String, 
        required: true, 
        unique: true, 
    },
    emergencyContactNo: {
        type: String, 
        required: true, 
        unique: true, 
    },
    presentAddress: {
        type: String, 
        required: true, 
    },
    permanentAddress: {
        type: String, 
        required: true, 
    },
    bloodGroup: {
        type: String, 
        enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+','AB-']
    }

})
 