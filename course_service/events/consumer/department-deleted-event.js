const topic = "department-deleted-topic-src-admin"

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const  kafka = require("salahorg/events/consumer/base-listener")
import Department from "../../models/department.js"

  const consumer = kafka.consumer({ groupId: 'department_deleted_course-service' })
  
  export const department_deleted_consumer = async () => {

	await consumer.connect()
	await consumer.subscribe({ topic  })
    console.log("consumer department_deleted_is up and runing!!!!!!!");

	await consumer.run({

	eachMessage: async  ({   message }) => {

    console.log(   JSON.parse (message.value) )
    console.log("iam delete listener department");

       await Department.findOneAndDelete({department_code : JSON.parse (message.value).department_code})
		 
 
   	  },
	})
  }
 
 

  

 