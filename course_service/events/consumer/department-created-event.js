
const topic = "department-created-topic-src-admin"

import { createRequire } from 'module';

import Department from "../../models/department.js"

const require = createRequire(import.meta.url);

const  kafka = require("salahorg/events/consumer/base-listener")


  const consumer = kafka.consumer({ groupId: 'department_created-course-service' })
  
 export const department_created_consumer = async () => {
	await consumer.connect()
	await consumer.subscribe({ topic })
    console.log("consumer department_created_is up and runing!!!!!!!");

	await consumer.run({
	  
	  eachMessage: async  ({   message }) => {
        console.log("Recieved department_created_event From program !!!!!!!");
		 
		console.log(   JSON.parse (message.value) )

        
             // Example    
     const department =  await new Department({
            name : JSON.parse (message.value).name ,
            programs : [],
            department_code: JSON.parse (message.value).department_code,

       })
       const save = await department.save()
       console.log(save);
  	  }
	})
  }
 
 

  

 