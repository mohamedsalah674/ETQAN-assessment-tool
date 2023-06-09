const topic = "course-updated-topic-src-admin"

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const  kafka = require("salahorg/events/consumer/base-listener")
import Course from "../../models/Course.js"

  const consumer = kafka.consumer({ groupId: 'course_updated_course-service' })
  
 export  const course_updated_consumer = async () => {

	await consumer.connect()
	await consumer.subscribe({ topic  })
    console.log("consumer course_updated_is up and runing!!!!!!!");

	await consumer.run({
	// eachBatch: async ({ batch }) => {
	//   console.log(batch)x
	// },
	eachMessage: async  ({   message }) => {

    console.log(   JSON.parse (message.value) )
    console.log("iam updated listener Course");

      const res = await Course.findOne({code : JSON.parse (message.value).course_code} )
	 const final_doc =  await res.updateOne({name : JSON.parse (message.value).name })
		  console.log(final_doc);
  
   	  },
	})
  }
 
 

  

 