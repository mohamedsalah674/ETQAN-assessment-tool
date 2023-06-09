import OverallSurvey from "../models/overallSurvey.js";

export const getAllOverallSurveys = async (req, res) => {
  try {
    const survey = await OverallSurvey.find();
    res.status(200).json({ data: survey });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
export const getOverallSurvey = async (req, res) => {
  const { surveyId } = req.params;
  try {
    const survey = await OverallSurvey.findById(surveyId);
    res.json({ status: 200, data: survey });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
export const createOverallSurvey = async (req, res) => {
  try {
    const survey = await OverallSurvey.create(req.body);
    res
      .status(201)
      .json({ data: survey, message: "survey added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
export const editOverallSurvey = async (req, res) => {
  const { surveyId } = req.params;
  const { rate, answers, comment } = req.body;

  try {
    const survey = await OverallSurvey.findById(surveyId);
    if (!survey) {
      return res.status(404).json({ message: "Survey not found" });
    }

    survey.rates.push(rate);

    answers.forEach((answer) => {
      const { questionId, studentAnswer } = answer;
      const question = survey.questions.find(
        (q) => q._id.toString() === questionId
      );

      if (question) {
        question.answers.push(studentAnswer);
      }
    });

    survey.comments.push(comment);

    const result = await survey.save();

    res
      .status(200)
      .json({ data: result, message: "Survey updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

export const deleteOverallSurvey = async (req, res) => {
  const { surveyId } = req.params;
  try {
    await OverallSurvey.findByIdAndDelete(surveyId);
    res.status(200).json({ message: "survey Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
