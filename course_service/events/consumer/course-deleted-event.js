const topic = "course-deleted-topic-src-admin"
import Instructor from "../../models/instructor.js";
import Marks from "../../models/marks.js";
import Image from "../../models/images.js";
import Program from "../../models/Program.js";

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const  kafka = require("salahorg/events/consumer/base-listener")

import Course from "../../models/Course.js"

  const consumer = kafka.consumer({ groupId: 'course_deleted_course-service' })
  
  export const course_deleted_consumer = async () => {

	await consumer.connect()
	await consumer.subscribe({ topic  })
    console.log("consumer course_deleted_is up and runing!!!!!!!");

	await consumer.run({

	eachMessage: async  ({   message }) => {

    console.log(   JSON.parse (message.value) )
    console.log("iam delete listener Course");

    const course = await Course.findOne({code : JSON.parse (message.value).course_code})

    // if (!course){
    //   throw new Ba
    // }
    const program = await Program.findOne({coursesIds : course._id})
    console.log(program);
    const programId = program._id

    // Find and delete the associated instructors
    const instructorIds = course.instructors;
    await Instructor.deleteMany({ _id: { $in: instructorIds } });

    // Find and delete the associated marks
    const marksIds = course.marks;
    await Marks.deleteMany({ _id: { $in: marksIds } });

    // Find and delete the associated images
    const imagesIds = course.samples;
    await Image.deleteMany({ _id: { $in: imagesIds } });

    // Remove the course ID from the associated program
    await Program.findByIdAndUpdate(programId, {
      $pull: { coursesIds: course._id },
    });

    // Delete the course itself
    await Course.findByIdAndDelete(course._id);
    
 
   	  },
	})
  }
 
 

  

 