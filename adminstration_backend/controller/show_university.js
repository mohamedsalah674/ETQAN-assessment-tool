const mongoose = require('mongoose');
const Universitydb = mongoose.model('universitydb');
const NotFoundError = require('salahorg/errors/not-found-error');
const BadRequestError = require('salahorg/errors/bad-request-error');

const get_university = async (req, res) => {
  const universityId = req.params.university_id;

  // If university id is missing
  if (!universityId) {
    throw new BadRequestError('University id should be provided');
  }

  try {
    // Handle error if universityId is not a valid ObjectId
    if (!mongoose.isValidObjectId(universityId)) {
      throw new BadRequestError('University id is not valid');
    }

    // Find the university by its id and populate faculties
    const university = await Universitydb.findById(universityId).populate({
      path: 'faculties',
      select: 'name faculty_code',
    });

    if (!university) {
      throw new NotFoundError('University not found');
    }

    res.send(university);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error occurred');
  }
};

module.exports = { get_university };
