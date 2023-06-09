
const topic = "program-created-topic-src-admin"

import { createRequire } from 'module';
import Program from "../../models/Program.js"
import Department from '../../models/department.js';

const require = createRequire(import.meta.url);

const  kafka = require("salahorg/events/consumer/base-listener")
const BadRequestError = require('salahorg/errors/bad-request-error');


  const consumer = kafka.consumer({ groupId: 'program_created-program-service' })
  
 export const program_created_consumer = async () => {
	await consumer.connect()
	await consumer.subscribe({ topic })
    console.log("consumer program_created_is up and runing!!!!!!!");

	await consumer.run({
	  
	  eachMessage: async  ({   message }) => {
        console.log("Recieved program_created_event From program !!!!!!!");
		 
		console.log(   JSON.parse (message.value) )

    const department = await Department.findOne({department_code : JSON.parse (message.value).department_code })
    if (!department){
      throw new BadRequestError("department is not found")
    }
        
             // Example    
     const program =   await Program.create({
            name : JSON.parse (message.value).name ,
            program_code : JSON.parse (message.value).Program_Id,
            credits : 0 ,
            information: ' This program is created by admin please modify it', 
            courses: 'NA' ,
            abet_criteria : "NA" , 
            SOs: "NA" ,
       })

      const program_id = program._id

      await Department.findByIdAndUpdate(department._id, {
        $addToSet: { programsIds: program_id },
      });
    

  	  }
	})
  }
 
 

  

 