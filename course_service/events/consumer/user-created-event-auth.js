
const topic = "user-created-topic-src-auth"
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const  kafka = require("salahorg/events/consumer/base-listener")
const consumer = kafka.consumer({ groupId: 'user_created-course-service-src-auth' })
import Instructor from "../../models/instructor.js"
import Coordinator from '../../models/coordinator.js';
import Head_of_department from '../../models/head_of_department.js';
import { log } from 'console';



 export const user_created_consumer_src_auth= async () => {
	await consumer.connect()
	await consumer.subscribe({topic})
    console.log("consumer user_created_is up and runing!!!!!!!");

	await consumer.run({
	  
	  eachMessage: async  ({   message }) => {
        console.log("Recieved user_created_event From admin !!!!!!!");
		 
		console.log(   JSON.parse (message.value) )

        const role = JSON.parse (message.value).role
             // Example    

             if (role == 'instructor')
           {  
        const instrcutors = new Instructor({
            _id :JSON.parse(message.value)._id,
            name : JSON.parse (message.value).name ,
            role : JSON.parse (message.value).role ,
            program: 1, 
            email: JSON.parse (message.value).email,
            password: JSON.parse (message.value).password,
            employee_id: 'NA',
            courses: [] ,
            academic_title: JSON.parse (message.value).academicPosition,
       })
       const instr_doc = await instrcutors.save()
       console.log(instr_doc);

        }

        else if (role == 'coordinator')
        {
            const coordinator = new Coordinator({
              _id :JSON.parse(message.value)._id,
                name : JSON.parse (message.value).name ,
                role : JSON.parse (message.value).role ,
                program_name: 'NA', 
                email: JSON.parse (message.value).email,
                password: JSON.parse (message.value).password,
                employee_id: 'NA',
                courses: [] ,
                academic_title: JSON.parse (message.value).academicPosition,
           })
           const coordinator_doc = await coordinator.save()
           console.log(coordinator_doc);

        }

        else if (role == 'super_instructor')
        {
            const instrcutors = new Instructor({
              _id :JSON.parse(message.value)._id,
                name : JSON.parse (message.value).name ,
                role : JSON.parse (message.value).role ,
                program: 'NA', 
                email: JSON.parse (message.value).email,
                password: JSON.parse (message.value).password,
                employee_id: 'NA',
                courses: [] ,
                academic_title: JSON.parse (message.value).academicPosition,
           })
           const instr_doc = await instrcutors.save()
           console.log(instr_doc);

           const coordinator = new Coordinator({
            _id :JSON.parse(message.value)._id,
            name : JSON.parse (message.value).name ,
            role : JSON.parse (message.value).role ,
            program_name: 'NA', 
            email: JSON.parse (message.value).email,
            password: JSON.parse (message.value).password,
            employee_id: 'NA',
            courses: [] ,
            academic_title: JSON.parse (message.value).academicPosition,
       })
       const coordinator_doc = await coordinator.save()
       console.log(coordinator_doc);


        }



        else if (role == 'head_of_department')
      {
        const head_of_department = new Head_of_department({
          _id :JSON.parse(message.value)._id,
            name : JSON.parse (message.value).name ,
            role : JSON.parse (message.value).role ,
            department_name: 'NA', 
            email: JSON.parse (message.value).email,
            password: JSON.parse (message.value).password,
            academic_title: JSON.parse (message.value).academicPosition,
       })
       const head_of_department_doc = await head_of_department.save()
       console.log(head_of_department_doc);


      }

      else{
                log("This is does not belongs to me")
         }
      

      }
	})
  }
 
 

  

 