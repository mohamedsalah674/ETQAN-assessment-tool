const mongoose = require('mongoose');
const univeristySchema = require('../models/university');
const Universitydb = mongoose.model('universitydb', univeristySchema);
const NotFoundError=require('salahorg/errors/not-found-error');
const BadRequestError = require('salahorg/errors/bad-request-error');

const update_university = async (req, res) => {
  const university_Id = req.params.university_id;
  const { university_code, name } = req.body;

  // handel error from req.param
  const university_id = mongoose.Types.ObjectId(university_Id.trim());

  // if university does not enter university id
  if (!university_id) {
    throw new BadRequestError('University code must be provided');
  }

  // handel error if university_id is not ObjectId
  if (!mongoose.Types.ObjectId.isValid(university_id)) {
    throw new BadRequestError('university id is not vaild');
  }

  // Fields must not be empty
  if (!req.body) {
    throw new BadRequestError('Fields must not be empty');
  }

  // Check if university is exist
  const university_exist = await Universitydb.findById(university_id);

  // university is not exist
  if (!university_exist) {
    throw new NotFoundError();
  }

  const existing_University = await Universitydb.findOne({ university_code });

  // // Email , Id must be unique
  // if (existing_University) {
  //   throw new BadRequestError(
  //     'There is University with the same data , please choose another id or email'
  //   );
  // }

  // update data of University
  Universitydb.findByIdAndUpdate(university_id, req.body, {
    useFindAndModify: false,
  })

    .then((data) => {
      if (!data) {
        throw new NotFoundError();
      } else {
        res.status(200).send('University updated ');
      }
    })

    .catch((err) => {
      res.status(500).send({ message: 'Error database connection' });
    });
};

module.exports = { update_university };
