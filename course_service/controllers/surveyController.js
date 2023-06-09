import Survey from "../models/survey.js";

export const getAllSurveys = async (req, res) => {
  try {
    const survey = await Survey.find();
    res.status(200).json({ data: survey });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
export const getSurvey = async (req, res) => {
  const { surveyId } = req.params;
  try {
    const survey = await Survey.findById(surveyId);
    res.json({ status: 200, data: survey });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
export const createSurvey = async (req, res) => {
  try {
    const survey = await Survey.create(req.body);
    res
      .status(201)
      .json({ data: survey, message: "survey added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
export const editSurvey = async (req, res) => {
  const { surveyId } = req.params;
  try {
    const result = await Survey.findByIdAndUpdate(
      surveyId,
      { $set: req.body },
      { new: true }
    );

    res
      .status(200)
      .json({ data: result, message: "survey Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
export const deleteSurvey = async (req, res) => {
  const { surveyId } = req.params;
  try {
    await Survey.findByIdAndDelete(surveyId);
    res.status(200).json({ message: "survey Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
