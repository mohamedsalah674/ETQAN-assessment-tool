
const topic = "course-created-topic-src-admin"

import { createRequire } from 'module';
import Course from "../../models/Course.js";
import Program from "../../models/Program.js";
import IreAssessment from "../../models/ireAssessment.js";


const require = createRequire(import.meta.url);

const  kafka = require("salahorg/events/consumer/base-listener")


  const consumer = kafka.consumer({ groupId: 'course_created-course-service' })
  
 export const course_created_consumer = async () => {
	await consumer.connect()
	await consumer.subscribe({ topic })
    console.log("consumer course_created_is up and runing!!!!!!!");

	await consumer.run({
	  
	  eachMessage: async  ({   message }) => {
        console.log("Recieved course_created_event From course !!!!!!!");
		 
		console.log(   JSON.parse (message.value) )

        const code = JSON.parse (message.value).Program_id
             // Example    
        const course = new Course({
            name : JSON.parse (message.value).name ,
            code : JSON.parse (message.value).course_code ,
            credits : 0 ,
            information: ' This course is created by admin please modifit it', 
            goals: 'NA' ,
            topics: [],
            clos: [],
            clos_codes: [],
            instructors: [],
            samples: [],
            marks:[],
            selectedAbetCri: [],
            textBook : "NA" , 
            instructorName: "NA" ,
            selectedProgOutcomes: "0",
            assessmentMethods:[]
       })

      const course_doc = await course.save()
      const course_id = course_doc._id
      const program = await Program.findOne({program_code : code}) 
      const program_id = program._id


      const initialIre = {
        ireSosArray: program.sosIds.map((so) => ({
          soId: so._id,
          pis: so.PIs.map((pi) => ({
            piId: pi._id,
            piValue: "I", // Initial value "I"
          })),
        })),
      };
      console.log("EWE", initialIre);
      const ire = await IreAssessment.create(initialIre);
  
      // Update the program and course with ire reference
      await Program.findByIdAndUpdate(program_id, {
        $addToSet: { coursesIds: course._id },
      });
    await Course.findByIdAndUpdate(course_id, {
        ireAssessment: ire._id,
      });

      

      }
	})
  }
 
 

  

 