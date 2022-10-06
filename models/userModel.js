const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  }
})

// static signup method
userSchema.statics.signup = async function (email, password) {

  // validation
  if (!email || !password) {
    // console.log("Please fill out all the fields")
    throw Error("Please fill out all the fields")
  }
  if (!validator.isEmail(email)) {
    // console.log("Please enter a valid email")
    throw Error("Please enter a valid email")
  }
  if (!validator.isStrongPassword(password)) {
    // console.log("Please enter a stronger password")
    throw Error("Please enter a stronger password")
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error("Email already exists")
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ email, password: hash })

  return user
}

module.exports = mongoose.model("User", userSchema)