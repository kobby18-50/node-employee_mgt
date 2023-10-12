import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Please provide user name"],
      unique: [true, "Duplicate value entered for username try another one"],
    },

    fullName: {
      type: String,
      required: [true, "Please provide full name"],
      unique : [true, 'Duplicate value entered for full name try a diiferent one'],
      minlength: 10,
      trim : true
    },

    email: {
      type: String,
      required: [true, "Provide email"],
      unique : [true, 'Duplicate value entered for email try a diiferent one'],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
    },

    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 8,
      default : 'adminpassword'

    },

    role: {
      type: String,
      required: [true, "Please select role"],
      default : 'admin'
    },

    jobTitle: {
      type: String,
      required: [true, "Please provide job title"],
    },

    department: {
      type: String,
      required: [true, "Please provide department"],
    },
  },
  { timestamps: true }
);

UserSchema.methods.getUser = function (){
  return { name : this.fullName, jobTitle : this.jobTitle, role : this.role}
  }

  
// hash password before saving
UserSchema.pre('save', async function(){
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// create token
UserSchema.methods.createJWT = function (){
  const token = jwt.sign({userId : this._id, role : this.role, username : this.userName}, process.env.JWT_SECRET, {expiresIn : process.env.JWT_LIFETIME})
  return token
}

// compare passwords
UserSchema.methods.comparePassword = async function(candidatePassword){
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}


export default mongoose.model("User", UserSchema);


