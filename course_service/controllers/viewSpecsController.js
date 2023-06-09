import Course from "../models/Course.js";

export async function viewSpecsController(req, res) {
  if (req.method === "GET") {
    try {
      // const id = req.query.id;
      // let course = await Course.findById(id);
      /////////////////////////get last added/////////////////////////////////
      let course = await Course.find({}).sort({ _id: -1 }).limit(1);
      course = course[0]; //get last added
      res.status(200).json(course);
    } catch (err) {
      console.log(err);
      res.status(400).json({ success: false });
    }
  }
}
export async function viewreport(req, res) {
  if (req.method === "GET") {
    try {
      const { id } = req.params;
      console.log("first");
      // let course = await Course.findById(id);
      /////////////////////////get last added/////////////////////////////////
      let course = await Course.findById(id);
      res.status(200).json(course);
    } catch (err) {
      console.log(err);
      res.status(400).json({ success: false });
    }
  }
}
