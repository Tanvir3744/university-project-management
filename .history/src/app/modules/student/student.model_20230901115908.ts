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
            }
        }
    }
})
 