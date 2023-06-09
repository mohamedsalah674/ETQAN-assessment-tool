import { log } from "util";
import Department from "../models/department.js";

import Head_of_department from "../models/head_of_department.js"

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const BadRequestError = require('salahorg/errors/bad-request-error');

export const getDepartment = async (req, res) => {
    const  {id}  = req.params;

    try {
      const dept = await Department.findOne({head_of_department : id}).populate("programsIds");
      if (! dept )
      {
        throw new BadRequestError("This head of department has not been added to any department yet")
      }
      res.json({ status: 200, data: dept });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  };