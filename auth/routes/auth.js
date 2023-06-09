const express = require('express');
const crypto = require('crypto');
require('express-async-errors');
const { body } = require('express-validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const BadRequestError = require('salahorg/errors/bad-request-error');
const validateRequest = require('salahorg/middlewares/validate-request');
const currentUser = require('salahorg/middlewares/current-user');
const bcrypt = require('bcrypt');
const { sendVerificationEmail } = require('../utils/email');
const { totp } = require('otplib');
const User = require('../models/users');
const TOTP = require('../models/top');
const { scraping } = require('../utils/verifiy');
const NotFoundError = require('salahorg/errors/not-found-error');
const producer_create  = require("../events/producer/user-created-event");
const { log } = require('console');
var mongoose = require('mongoose');
var id = new mongoose.Types.ObjectId();

const router = express.Router();
dotenv.config();

/*------------------------------------------------------------------- signup ------------------------------------------------------*/
const expirationTime = 60 * 1200; // seconds
router.post(
  '/api/users/signup',
  [
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Email is not valid'),
    body('URL')
      .notEmpty()
      .withMessage('URL is required')
      .isURL()
      .withMessage('URL is not valid'),
  ],
  validateRequest,
  async (req, res) => {
    var id = new mongoose.Types.ObjectId();
    let new_role = 'undefined';

    const { email, URL } = req.body;
    console.log(URL);
    // Verify email and url
    let ret;
    try {
      ret = await scraping(URL);
    } catch (error) {
      throw new BadRequestError(
        'Please make sure that you have entered vaild email and url'
      );
    }
    if (!ret) {
      throw new BadRequestError(
        'Please make sure that you have entered vaild email and url'
      );
    }

    // console.log(".............................................");
    console.log(ret);

    const URL_new = URL;
    if (email !== ret.eduMail) {
      throw new BadRequestError(
        'Your Edu mail does not match the Edu mail in the staff URL'
      );
    }

    const user = await User.findOne({ email: email });
    if (user && user.isVerified === true) {
      throw new BadRequestError('Account is already exist and verified');
    }

    // Create OTP
    totp.options = {
      ...totp.options,
      step: expirationTime,
      window: 0,
      digits: 10,
    };
    const token = totp.generate(email + process.env.TOTP_SECRET);
    console.log(email + process.env.TOTP_SECRET);
    console.log(token);

    const msg = {
      to: email ,
      subject: 'Verification email',
      text: `This is a verification email to confirm your identity, please click on this link to complete the signup process`,
      html: `<h2>Hello, ${email}</h2><br><h2></a>, This is your verfication code :  ${token}</h2> <br>  <h2> It will expire in three hours <h2/>`,
    };
    if (user === false) {
      const exisitingTotp = await TOTP.findOne({
        userId: user._id,
      });
      if (!exisitingTotp) throw new BadRequestError('Token not found');
      exisitingTotp.token = token;
      await exisitingTotp.save();
    } else if (!user) {
      //  User didn't verify before
      // Store user info



      if(ret.academicPos == 'Dept. Head')
      {new_role = 'head_of_department'}

      else{
        new_role = 'instructor'
      }

        const newUser = new User({
          _id : id,
        name: ret.Name,
        email: ret.eduMail,
        URL: URL_new,
        role: new_role,
        academicPosition: ret.academicPos,
        isVerified: false,
      });
      await newUser.save();

      const newTotp = new TOTP({
        token: token,
        userId: newUser._id,
      });
      // Save TOTP to DB
      await newTotp.save();
    }
   // Send an email with verification link
   const  asc = sendVerificationEmail(
      msg, 'ms2000.mohamedsalah@gmail.com' ,
      async result => {
        return res.status(201).send({ msg: "verification email sent" })
      },
      async error => {
        throw new BadRequestError("Verification email was not sent")
      }
    )
      console.log(asc);
    

  }
);

/*------------------------------------------------------------------vivify token----------------------------------------------------*/

router.get('/api/users/verify-token/:token', async (req, res) => {
  const token = req.params.token;
  const exisitingTotp = await TOTP.findOne({ token: token });
  if (!exisitingTotp) throw new NotFoundError();

  const user = await User.findOne({
    _id: exisitingTotp.userId,
  });

  if (!user) throw new NotFoundError();
  const isValid = totp.check(token, user.email + process.env.TOTP_SECRET);

  console.log(user.email + process.env.TOTP_SECRET);
  console.log(token);
  console.log(isValid);
  if (!isValid) throw new BadRequestError('Token has expired');
  res.send({
    isValid: isValid,
    email: user.email,
    name: user.name,
    url: user.Edu_URL,
  });
});

/*-------------------------------------------------------------------complete sign up-----------------------------------------------*/
router.post(
  '/api/users/complete-signup',
  [
    body('code').isString().withMessage('Token is required'),
    body('name').isString().withMessage('Name is required'),
    body('password').trim().notEmpty().withMessage('Password is required'),
    // .isStrongPassword({
    //   minLength: 8,
    //   minLowercase: 1,
    //   minUppercase: 1,
    //   minNumbers: 1,
    //   minSymbols: 0,
    //   returnScore: false,
    //   pointsPerUnique: 1,
    //   pointsPerRepeat: 1,
    //   pointsForContainingLower: 5,
    //   pointsForContainingUpper: 2,
    //   pointsForContainingNumber: 1
    // })
    // .withMessage("Password is not strong enough")
  ],
  
  validateRequest,
  async (req, res) => {
    const { code, name, password } = req.body;

    // Check if token is stored
    const exisitingTotp = await TOTP.findOne({
      token: code,
      // ,  userId: user._id,
    });
    if (!exisitingTotp) {
      console.log('error');

      throw new BadRequestError('Token does not belong to this email');
    }

    // Check if user is not found
    const user = await User.findById(exisitingTotp.userId);
    if (!user) throw new BadRequestError('User not found');
    if (user.isVerified)
      throw new BadRequestError('Account is already verified');

    // console.log(user.isVerified);
    // Check if token expired
    const isValid = totp.check(
      exisitingTotp.token,
      user.email + process.env.TOTP_SECRET
    );

    console.log(isValid);
    console.log(exisitingTotp.token);
    console.log(user.email + process.env.TOTP_SECRET);

    if (!isValid) throw new BadRequestError('Token has expired');
    // check if token belongs to user with this email
    if (!exisitingTotp.userId.equals(user._id)) {
      throw new BadRequestError('Token does not belong to this email');
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log(hashedPassword);

    user.set('password', hashedPassword);
    user.set('isVerified', true);
    user.set('name', name);
    user.set('isAdmin' , null)
    await user.save();

    const deleted_token = await TOTP.findOne({ token: code });
    // Delete stored TOTP
    await TOTP.findByIdAndDelete(deleted_token._id);

    // // Generate JWT
    // const userJwt = jwt.sign(
    //   {
    //     id: user.id,
    //     email: user.email,
    //     name: user.name,
    //   },
    //   process.env.JWT_KEY
    // )

    // // Store it on session object
    // req.session = {
    //   jwt: userJwt
    // }

    producer_create(user)
    console.log('producer is disconnected now');
    res.status(200).send(user);
  }
);

/*------------------------------------------------------------------- signIn ------------------------------------------------------*/

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('invalid email address'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('password required')
       
    // body('URL')
    // .notEmpty()
    // .isString()
    // .withMessage("URL must be provided sucessfully")
  ],
  validateRequest,
  async (req, res) => {
    const { email, password } = req.body;

    if (!password){
      throw new BadRequestError("Password required")
    }



    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new BadRequestError('Invalid credentials');
    }


 
    if (user.isAdmin ){

      console.log("This user is admin or created by admin then will pass without checking any thing ")
    }

    else

{    console.log(user);
    const url = user.URL;
    console.log(url);
    if (!url) {
      throw new BadRequestError(
        'This mail has not URL Yet. Please contact with admin of system'
      );
    }
    let ret;
    try {
      ret = await scraping(url);
    } catch (error) {
      throw new BadRequestError(error.message);
    }

    if (!ret) {
      throw new BadRequestError(
        'Please make sure that you have entered vaild email and url'
      );
    }
    if (email !== ret.eduMail) {
      throw new BadRequestError(
        'Your Edu mail does not match the Edu mail in the staff URL'
      );
    }

}

if (!user.isVerified) {
      throw new BadRequestError('This user is not Verified');
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid password ');
    }
  
    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email : user.email
      },
      process.env.JWT_KEY
    );

    // Store it on session object
    req.headers['authorization'] = token;

    console.log(
      req.headers.authorization,
      '5555555555555555555555555555555555555555555'
    );

    try {
      res.status(200).send({
        success: true,
        message: 'login successfully',
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: 'Error in login',
        error,
      });
    }
  }
);

/*------------------------------------------------------------------- forgotPassword ------------------------------------------------------*/

router.post(
  '/api/users/forgotpassword',

  [body('email').isEmail().withMessage('invalid email address')],

  validateRequest,
  async (req, res) => {
    const { email } = req.body;

    if (!email) {
      throw new BadRequestError('Email is required');
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new BadRequestError('there is no user with email address');
    }
    // const resetToken = user.createPasswordResetToken();
    // await user.save({ validateBeforeSave: false });
    // console.log(resetToken);

    // const resetURL = `${req.protocol}://${req.get(
    //   'host'
    // )}/api/users/resetpassword/${resetToken}`;

    const payload = {
      email: user.email,
      id: user._id,
    };
    console.log(user._id);

    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '15m' });

    console.log(token);
    const link = `${req.protocol}://etqan.dev/api/users/resetpassword/${user._id}/${token}`;
    const msg = {
      to: email,
      subject: 'Verification email',
      text: `This is a verification email to confirm your identity, please click on this link to complete the signup process`,
      html: `<h2>Hello, ${email}</h2><br><h2>Your verification link is <a href="https://etqan.dev/resetpassword/${user.id}/${token}">${link}</a>, it expires in two hours</h2>`,
    };

    sendVerificationEmail(
      msg,'ms2000.mohamedsalah@gmail.com',
      async (result) => {
        return res.status(201).send({ msg: 'verification email sent' });
      },
      async (error) => {
        console.log(error);
        throw new BadRequestError('Verification email was not sent');
      }
    );
  }
);

/*------------------------------------------------------------------- resetpassword ------------------------------------------------------*/

router.patch(
  '/api/users/resetpassword/:id/:token',

  [
    body('password')
      .trim()
      .notEmpty()
      .withMessage('password required')
      .isLength({ min: 6 })
      .withMessage('password must be at least 6 characters'),

    body('passwordConfirm')
      .trim()
      .notEmpty()
      .withMessage('passwordConfirm required'),
  ],
  validateRequest,
  async (req, res) => {
    const { password, passwordConfirm } = req.body;
    if (password !== passwordConfirm) {
      throw new BadRequestError(
        'password and confiramtion passwoed must be identica'
      );
    }

    const { id } = req.params;
    const hashedJwt = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');
    const user = await User.findOne({ _id: id });
    if (!user) {
      throw new BadRequestError('Invalid token or has expired');
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.password;

    user.passwordResetToken = undefined;
    user.resetPasswordExpires = undefined;

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    const hashedconfirmPassword = await bcrypt.hash(passwordConfirm, salt);

    user.password = hashedPassword;
    user.passwordConfirm = hashedconfirmPassword;

    await user.save();

    res.status(201).send('Password updated successfully');
  }
);

/*------------------------------------------------------------------- currentUser ------------------------------------------------------*/

router.get('/api/users/currentuser', currentUser, (req, res) => {
  console.log({ currentUser: req.currentUser || null });
  res.send({ currentUser: req.currentUser || null });
});

/*------------------------------------------------------------------- signOut ------------------------------------------------------*/

router.get('/api/users/signout', (req, res) => {
  req.headers.authorization = null;

  res.send({});
});

module.exports = router;
