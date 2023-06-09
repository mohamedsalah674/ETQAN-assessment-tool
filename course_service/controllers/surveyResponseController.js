import mongoose from "mongoose";
import Survey from "../models/survey.js";

const responseSchema = new mongoose.Schema({
  comment: { type: String },
  rate: { type: Number },
});

const Response = mongoose.model("Response", responseSchema);

export const getAllResponses = async (req, res) => {
  try {
    const { surveyId } = req.params;

    const survey = await Survey.findById(surveyId);

    if (!survey) {
      return res.status(404).json({ message: "Survey not found" });
    }

    const responses = survey.students_responses;

    res.status(200).json({
      status: "Responses found",
      data: {
        responses,
      },
    });
  } catch (error) {
    console.error("Error getting responses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createResponse = async (req, res) => {
  const surveyId = req.params.surveyId;
  try {
    const { comment, rate } = req.body;

    const response = new Response({
      comment,
      rate,
    });

    const survey = await Survey.findById(surveyId);

    if (!survey) {
      return res.status(404).json({ message: "Survey not found" });
    }

    survey.students_responses.push(response);
    const savedSurvey = await survey.save();

    res.status(201).json({
      status: "Response created successfully",
      data: {
        response:
          savedSurvey.students_responses[
            savedSurvey.students_responses.length - 1
          ],
      },
    });
  } catch (error) {
    console.error("Error creating response:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getResponse = async (req, res) => {
  try {
    const { responseId } = req.params;

    const survey = await Survey.findOne({
      "students_responses._id": responseId,
    });

    if (!survey) {
      return res.status(404).json({ message: "Response not found" });
    }

    const response = survey.students_responses.id(responseId);

    if (!response) {
      return res.status(404).json({ message: "Response not found" });
    }

    res.status(200).json({
      status: "Response found",
      data: {
        response,
      },
    });
  } catch (error) {
    console.error("Error getting response:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const editResponse = async (req, res) => {
  try {
    const { responseId } = req.params;
    const { comment, rate } = req.body;

    const survey = await Survey.findOne({
      "students_responses._id": responseId,
    });

    if (!survey) {
      return res.status(404).json({ message: "Response not found" });
    }

    const response = survey.students_responses.id(responseId);

    if (!response) {
      return res.status(404).json({ message: "Response not found" });
    }

    response.comment = comment;
    response.rate = rate;

    const savedSurvey = await survey.save();

    res.status(200).json({
      status: "Response updated successfully",
      data: {
        response,
      },
    });
  } catch (error) {
    console.error("Error updating response:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteResponse = async (req, res) => {
  try {
    const { surveyId, responseId } = req.params;

    const survey = await Survey.findById(surveyId);

    if (!survey) {
      return res.status(404).json({ message: "Survey not found" });
    }

    let response_index = await survey.students_responses.findIndex(
      (response) => response._id == responseId
    );
    await survey.students_responses.splice(response_index, 1);
    const savedSurvey = await survey.save();

    res.status(200).json({
      status: "Response deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting response:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
