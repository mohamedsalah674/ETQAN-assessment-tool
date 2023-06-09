const topic = "department-updated-topic-src-admin"

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import Department from "../../models/department.js"

const  kafka = require("salahorg/events/consumer/base-listener")

  const consumer = kafka.consumer({ groupId: 'department_updated_course-service' })
  
 export  const department_updated_consumer = async () => {

	await consumer.connect()
	await consumer.subscribe({ topic  })
    console.log("consumer department_updated_is up and runing!!!!!!!");

	await consumer.run({
	// eachBatch: async ({ batch }) => {
	//   console.log(batch)x
	// },
	eachMessage: async  ({   message }) => {

    console.log(   JSON.parse (message.value) )
    console.log("iam updated listener department");

      const res = await Department.findOne({department_code : JSON.parse (message.value).department_code} )
	 const final_doc =  await res.updateOne({name : JSON.parse (message.value).name })
		  console.log(final_doc);
  
   	  },
	})
  }
 
 

  

 