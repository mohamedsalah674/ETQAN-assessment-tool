const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const {Schema} = mongoose

const UserSchema = new mongoose.Schema(
  {
    _id : { type : Schema.Types.ObjectId},

    name: {
      type: String,
      lowercase: true,
      required: [true, 'name require'],
    },

    email: {
      type: String,
      required: [true, 'email required'],
      unique: true,
      // lowercase: true,
    },

    password: {
      type: String,
       //  required: [true, 'password required'],
      minLength: [8, 'too short password'],
    },

    passwordConfirm: {
      type: String,
      // required: [false, 'password required'],
      minLength: [8, 'too short password'],
    },
    passwordChangedAt: {
      type: Date,
      //   required: false,
    },
    passwordResetUserJwt: { type: String },

    resetPasswordExpires: {
      type: Date,
      // required: false,
    },

    role: {
      type: String,
      enum: [
        'instructor',
        'admin',
        'coordinator',
        'head_of_department',
        'dean',
        'undefined',
        'super_instructor'
      ],
    },

    isVerified: Boolean,
    URL: String,
    isAdmin : Boolean,

    academicPosition: String,
  },
  { timestamps: true }
);

// UserSchema.pre('save', async function (next) {
//   try {
//     const salt = await bcrypt.genSalt(12);
//     const hashedPassword = await bcrypt.hash(this.password, salt);
//     this.password = hashedPassword;
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// UserSchema.methods.createPasswordResetToken = function () {
//   const resetUserJwt = crypto.randomBytes(32).toString('hex');
//   this.passwordResetUserJwt = crypto
//     .createHash('sha256')
//     .update(resetUserJwt)
//     .digest('hex');
//   console.log({ resetUserJwt }, this.passwordResetUserJwt);
//   return resetUserJwt;
// };

const User = mongoose.model('User', UserSchema);

module.exports = User;
