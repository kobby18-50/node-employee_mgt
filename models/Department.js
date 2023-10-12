
import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema({
    department : {
        type : String,
        required : [true, 'Provide value for department' ],
        unique : [true, 'Duplicate value entered for department, try a different one']
    },

    createdBy : {
        type : mongoose.Types.ObjectId,
        ref : 'User',
        required : [true, 'Please provide User']
    }
}, {timestamps: true})

export default mongoose.model('Department', DepartmentSchema)