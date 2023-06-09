const topic = "user-deleted-topic-course-srv"
import Instructor from "../../models/instructor.js"
import Coordinator from '../../models/coordinator.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const  kafka = require("salahorg/events/consumer/base-listener")
const BadRequestError = require('salahorg/errors/bad-request-error');

const consumer = kafka.consumer({ groupId: 'user_deleted_course-service' })
  

  export const user_deleted_consumer = async () => {

	await consumer.connect()
	await consumer.subscribe({ topic  })
    console.log("consumer user_deleted_is up and runing!!!!!!!");

	await consumer.run({

	eachMessage: async  ({   message }) => {

    console.log(   JSON.parse (message.value) )
    console.log("iam delete listener user");

    const role = JSON.parse (message.value).role

    if(role == 'instructor')
    {
        const user = await Instructor.findOne({email : JSON.parse (message.value).email})

        if (!user)

        {
            throw new BadRequestError("This user does not exist in Instructors database")
        }

            // Delete the course itself
        const deleted_instrcutor = await Instructor.findByIdAndDelete(user._id);

        console.log(deleted_instrcutor);

    }



     if (role == 'coordinator')
    {
        const user = await Coordinator.findOne({email : JSON.parse (message.value).email})

        if (!user)

        {
            throw new BadRequestError("This user does not exist in Coordinators database")
        }

            // Delete the course itself
        const deleted_Coordinator = await Coordinator.findByIdAndDelete(user._id);

        console.log(deleted_Coordinator);


    }

     if (role == 'super_instructor')
    {
        const user = await Instructor.findOne({email : JSON.parse (message.value).email})
        if (!user)

        {
            throw new BadRequestError("This user does not exist in Instructors database")
        }

            // Delete the course itself
        const deleted_instrcutor = await Instructor.findByIdAndDelete(user._id);

        console.log(deleted_instrcutor);

        const coordinator = await Coordinator.findOne({email : JSON.parse (message.value).email})

        if (!coordinator)

        {
            throw new BadRequestError("This user does not exist in Coordinators database")
        }

            // Delete the course itself
        const deleted_Coordinator = await Coordinator.findByIdAndDelete(coordinator._id);

        console.log(deleted_Coordinator);

    }
    
    else
        {
            console.log("This user does not belongs to me")
        }

    
   	  },
	})
  }
 
 

  

 