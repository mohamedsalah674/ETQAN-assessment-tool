
const topic = "add-head-to-department"

import { createRequire } from 'module';
import Department from "../../models/department.js"
import Head_of_department from "../../models/head_of_department.js"

const require = createRequire(import.meta.url);

const  kafka = require("salahorg/events/consumer/base-listener")
const BadRequestError = require('salahorg/errors/bad-request-error');


  const consumer = kafka.consumer({ groupId: 'head_added_in-program-service' })
  
 export const Head_added_consumer = async () => {
    let head_is_exist = null
	await consumer.connect()
	await consumer.subscribe({ topic })
    console.log("consumer head_added_is up and runing!!!!!!!");

	await consumer.run({
	  
	  eachMessage: async  ({   message }) => {
        console.log("Recieved head_added_event From adminstration !!!!!!!");
		 
		console.log(   JSON.parse (message.value) )

        const department_code = JSON.parse (message.value).Department_code

        let department_is_exist = await Department.findOne({department_code: department_code})

        if (!department_is_exist){
            throw new BadRequestError("Department is not found")
        }

        const Head_email = JSON.parse (message.value).user.email
         head_is_exist = await Head_of_department.findOne({email : Head_email})
       
        if(!head_is_exist){
        
             head_is_exist = await Head_of_department.create({

                name: JSON.parse (message.value).user.name  ,
                role: JSON.parse (message.value).user.role  ,
                email: JSON.parse (message.value).user.email ,
                password: JSON.parse (message.value).user.password ,
                department_name: JSON.parse (message.value).department_name ,
                academic_title:JSON.parse (message.value).user.academicPosition ,
            })

            await head_is_exist.save()
            }

        const final_add =  await Department.findById(department_is_exist._id);

   
        await Department.findByIdAndUpdate(final_add._id, {
            $addToSet: { head_of_department: head_is_exist._id },
          });
        
    
    }
	})
  }
 
 

  

 