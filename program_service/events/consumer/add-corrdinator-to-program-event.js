const topic = "add-coordinator-to-program"

import { createRequire } from 'module';
import Program from '../../models/Program.js';
import Coordinator from '../../models/coordinator.js';
const require = createRequire(import.meta.url);

const  kafka = require("salahorg/events/consumer/base-listener")
const BadRequestError = require('salahorg/errors/bad-request-error');


  const consumer = kafka.consumer({ groupId: 'coordinator_added_in-program-service' })
  
 export const coordinator_added_consumer = async () => {
    let coordinator_is_exist = null
  await consumer.connect()
  await consumer.subscribe({ topic })
    console.log("consumer coordinator_added_is up and runing!!!!!!!");

  await consumer.run({
    
    eachMessage: async  ({   message }) => {
        console.log("Recieved coordinator_added_event From adminstration !!!!!!!");
     
    console.log(   JSON.parse (message.value) )

        const program_code = JSON.parse (message.value).Program_Id

        let program_is_exist = await Program.findOne({program_code: program_code})

        if (!program_is_exist){
            throw new BadRequestError("Program is not found")
        }

        const coordinator_email = JSON.parse (message.value).user.email
        coordinator_is_exist = await Coordinator.findOne({email : coordinator_email})
        const porg__id = program_is_exist._id

        if(!coordinator_is_exist){
        
            coordinator_is_exist = await Coordinator.create({

                name: JSON.parse (message.value).user.name  ,
                role: JSON.parse (message.value).user.role  ,
                email: JSON.parse (message.value).user.email ,
                password: JSON.parse (message.value).user.password ,
                program_name: JSON.parse (message.value).program_name ,
                academic_title:JSON.parse (message.value).user.academicPosition ,
                employee_id: "NA",
                programId: porg__id,

            })

            await coordinator_is_exist.save()
            }

        const final_add =  await Program.findById(program_is_exist._id);

   
        await Program.findByIdAndUpdate(final_add._id, {
            $addToSet: { coordinator: coordinator_is_exist._id },
          });
        
        await Coordinator.findByIdAndUpdate(coordinator_is_exist._id , {
            $addToSet: { programId: program_is_exist._id },

         } )
    
    }
  })
  }