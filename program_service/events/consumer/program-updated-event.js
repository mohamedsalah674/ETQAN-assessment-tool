const topic = "program-updated-topic-src-admin"

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import Program from "../../models/Program.js"

const  kafka = require("salahorg/events/consumer/base-listener")

  const consumer = kafka.consumer({ groupId: 'program_updated_program-service' })
  
 export  const program_updated_consumer = async () => {

	await consumer.connect()
	await consumer.subscribe({ topic  })
    console.log("consumer program_updated_is up and runing!!!!!!!");

	await consumer.run({
	// eachBatch: async ({ batch }) => {
	//   console.log(batch)x
	// },
	eachMessage: async  ({   message }) => {

    console.log(   JSON.parse (message.value) )
    console.log("iam updated listener program");

      const res = await Program.findOne({program_code : JSON.parse (message.value).Program_Id} )
	 const final_doc =  await res.updateOne({name : JSON.parse (message.value).name })
		  console.log(final_doc);
  
   	  },
	})
  }
 
 

  

 