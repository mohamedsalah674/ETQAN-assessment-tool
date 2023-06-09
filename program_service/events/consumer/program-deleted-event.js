const topic = "program-deleted-topic-src-admin"

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const  kafka = require("salahorg/events/consumer/base-listener")
import Program from "../../models/Program.js"
import Department from '../../models/department.js';
  const consumer = kafka.consumer({ groupId: 'program_deleted_program-service' })
  
  export const program_deleted_consumer = async () => {

	await consumer.connect()
	await consumer.subscribe({ topic  })
    console.log("consumer program_deleted_is up and runing!!!!!!!");

	await consumer.run({

	eachMessage: async  ({   message }) => {

    console.log(   JSON.parse (message.value) )
    console.log("iam delete listener program");


     const program =  await Program.findOneAndDelete({program_code : JSON.parse (message.value).Program_Id})
    console.log(program , "Praogrmmmmmmmmmmmmmm ");
     const department = await Department.findOne({programsIds: program._id})
    console.log(department , "deatrttttttttt");
           // Remove the course ID from the associated program
    await Department.findByIdAndUpdate(department._id, {
      $pull: { programsIds: program._id },
    });
		 
 
   	  },
	})
  }
 
 

  

 