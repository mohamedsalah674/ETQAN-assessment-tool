import program from "../models/Program.js";
import Image from "../models/images.js";
import Course from "../models/Course.js";
import express from "express";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDAPIKEY,
  api_secret: process.env.CLOUDINARYSECRET,
  // secure: true,
});

export const getAllSamples = async (req, res) => {
  const courseId = req.params.courseId; // Get the courseId from request parameters
  try {
    const course = await Course.findById(courseId).populate("samples"); // Find the course by _id

    if (!course) {
      return res.status(404).send("Course not found");
    }

    const samples = course.samples; // Get the sample images from the course
    res.status(200).json({ data: samples });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
export const getSample = async (req, res) => {
  const courseId = req.params.courseId; // Get the courseId from request parameters
  const sampleId = req.params.sampleId; // Get the courseId from request parameters
  try {
    const course = await Course.findById(courseId).populate("samples");

    if (!course) {
      return res.status(404).send("Course not found");
    }

    const sample = course.samples.find(
      (sample) => sample._id.toString() === sampleId
    );

    if (!sample) {
      return res.status(404).json({ error: "Sample not found" });
    }

    res.json({ status: 200, data: sample });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

export const createSample = async (req, res) => {
  const courseId = req.params.courseId;
  const sampleId = req.params.sample;
  const sampleData = req.body;
  try {
    // Find the Course document by ID
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).send("Course not found");
    }
    // Create a new sample document
    const sample = await Image.create(sampleData);

    // Add the sample to the Course's instructors array
    course.samples.push(sample._id);

    // Save the updated Course document to the database
    const savedCourse = await course.save();
    res
      .status(201)
      .json({ data: sample, message: "Sample Image added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

//de elmafroood ttms7 "Kamal"
export const updateSample = async (req, res) => {
  const { id } = req.params;
  try {
    await Image.findByIdAndDelete(id);
    cloudinary.uploader.destroy("my-uploads/tzjmmev8gggtdvcniool");
    //da lesa na2so t8yer el id

    res.status(200).json({ message: "Image Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

export const deleteSample = async (req, res) => {
  const courseId = req.params.courseId; // Get the courseId from request parameters
  const sampleId = req.params.sampleId; // Get the sampleId from request parameters
  try {
    // Find the sample image and delete it
    const deletedSample = await Image.findByIdAndDelete(sampleId);
    if (!deletedSample) {
      return res.status(404).json({ error: "Sample not found" });
    }

    // Remove the samples ID from the instructors IDs array inside the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const sampleIndex = await course.samples.indexOf(sampleId);
    console.log("qqqqqqqqqqqqqw", sampleIndex);
    if (sampleIndex !== -1) {
      course.samples.splice(sampleIndex, 1);
    }

    // Save the updated course
    await course.save();

    res.status(200).json({
      status: "Sample has been deleted!",
      data: {
        deletedSample,
      },
    });
  } catch (err) {
    console.error(
      `Error deleting sample with ID ${sampleId} for course with ID ${courseId}:`,
      err
    );
    throw err;
  }
};
