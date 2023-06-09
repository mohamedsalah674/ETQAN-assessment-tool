const topic = "user-updated-topic"
import Instructor from "../../models/instructor.js"
import Coordinator from '../../models/coordinator.js';
import Head_of_department from '../../models/head_of_department.js';

import { createRequire } from 'module';
import Program from "../../models/Program.js";
import coordinatorRouter from "../../routes/coordinatorRoutes.js";
const require = createRequire(import.meta.url);

const  kafka = require("salahorg/events/consumer/base-listener")
const BadRequestError = require('salahorg/errors/bad-request-error');

const consumer = kafka.consumer({ groupId: 'user_updated_course-service' })
  

  export const user_updated_consumer = async () => {

	await consumer.connect()
	await consumer.subscribe({ topic  })
    console.log("consumer user_updated_is up and runing!!!!!!!");

	await consumer.run({

	eachMessage: async  ({   message }) => {

    console.log(   JSON.parse (message.value).data )
    console.log("iam update listener user");

    const new_role = JSON.parse (message.value).data.role
    const pervious_role = JSON.parse (message.value).pervious_role



    if(new_role == 'coordinator' && pervious_role == 'instructor')
    {
        const user = await Instructor.findOne({email : JSON.parse (message.value).data.email})

 if(user)

     {       // Delete the course itself
        const deleted_instrcutor_from_instructors = await Instructor.findByIdAndDelete(user._id);

        console.log(deleted_instrcutor_from_instructors);


        const add_new_coordinator = new Coordinator({
            _id :JSON.parse(message.value).data._id,
            name : JSON.parse (message.value).data.name ,
            role : JSON.parse (message.value).data.role ,
            program_name: 'NA', 
            email: JSON.parse (message.value).data.email,
            password: JSON.parse (message.value).data.password,
            employee_id: 'NA',
            courses: [] ,
            academic_title: JSON.parse (message.value).data.academicPosition,
        })
        const coordinator_doc = await add_new_coordinator.save()
        console.log(coordinator_doc);

        const program = await Program.findOne({coordinator : coordinator_doc._id})
        if (! program)
        {throw new BadRequestError("this user has no programs yet")}

        await Coordinator.findByIdAndUpdate(coordinator_doc._id , {
            $addToSet: { programId: program._id },

         } )}

         if (!user){
            console.log("Salah 1 bs");
         }
    }



    else if (new_role == 'instructor' && pervious_role == 'coordinator')
    {
        const user = await Coordinator.findOne({email : JSON.parse (message.value).data.email})

        if (!user)

        {
            throw new BadRequestError("This user does not exist in Coordinators database")
        }

            // Delete the course itself
        const deleted_Coordinator = await Coordinator.findByIdAndDelete(user._id);

        console.log(deleted_Coordinator);

        const instrcutors = new Instructor({
            _id :JSON.parse(message.value).data._id,
            name : JSON.parse (message.value).data.name ,
            role : JSON.parse (message.value).data.role ,
            program: 0, 
            email: JSON.parse (message.value).data.email,
            password: JSON.parse (message.value).data.password,
            employee_id: 'NA',
            courses: [] ,
            academic_title: JSON.parse (message.value).data.academicPosition,
       })
       const instr_doc = await instrcutors.save()
       console.log(instr_doc);



    }

    else if (new_role == 'instructor' && pervious_role == 'instructor')
    {
        console.log("Duplicate role of instructor");
        const event = {
            _id :JSON.parse(message.value).data._id,
            name : JSON.parse (message.value).data.name ,
            email: JSON.parse (message.value).data.email,
            password: JSON.parse (message.value).data.password,
            academic_title: JSON.parse (message.value).data.academicPosition,

        }

        const user = await Instructor.findOne({email : JSON.parse (message.value).data.email,})
        if (!user)
        {
            throw new BadRequestError("user not found in database")
        }
        await Instructor.findByIdAndUpdate(user._id , event)
    }    


    else if (new_role == 'coordinator' && pervious_role == 'coordinator')
    {

        console.log("Duplicate role of coordinator");
        const event = {
            _id :JSON.parse(message.value).data._id,
            name : JSON.parse (message.value).data.name ,
            email: JSON.parse (message.value).data.email,
            password: JSON.parse (message.value).data.password,
            academic_title: JSON.parse (message.value).data.academicPosition,

        }

        const user = await Coordinator.findOne({email : JSON.parse (message.value).data.email,})
        if (!user)
        {
            throw new BadRequestError("user not found in database")
        }
        await Coordinator.findByIdAndUpdate(user._id , event)



    }



    else if (new_role == 'haed_of_department' && pervious_role == 'instructor')
    {

        const user = await Instructor.findOne({email : JSON.parse (message.value).data.email})

        if (!user)

        {
            throw new BadRequestError("This user does not exist in Instructors database")
        }

            // Delete the course itself
        const deleted_instrcutor_from_instructors = await Instructor.findByIdAndDelete(user._id);

        console.log(deleted_instrcutor_from_instructors);


        const head_of_department = await new Head_of_department({
            _id :JSON.parse(message.value).data._id,
              name : JSON.parse (message.value).data.name ,
              role : JSON.parse (message.value).data.role ,
              department_name: 'NA', 
              email: JSON.parse (message.value).data.email,
              password: JSON.parse (message.value).data.password,
              academic_title: JSON.parse (message.value).data.academicPosition,
         })
         const head_of_department_doc = await head_of_department.save()
         console.log(head_of_department_doc);

    }

    
    else if (new_role == 'head_of_department' && pervious_role == 'coordinator')
    {

        const user = await Head_of_department.findOne({email : JSON.parse (message.value).data.email})

        if (!user)

        {
            throw new BadRequestError("This user does not exist in Instructors database")
        }

            // Delete the course itself
        const deleted_instrcutor_from_instructors = await Head_of_department.findByIdAndDelete(user._id);

        console.log(deleted_instrcutor_from_instructors);



        const head_of_department = await new Head_of_department({
            _id :JSON.parse(message.value).data._id,
              name : JSON.parse (message.value).data.name ,
              role : JSON.parse (message.value).data.role ,
              department_name: 'NA', 
              email: JSON.parse (message.value).data.email,
              password: JSON.parse (message.value).data.password,
              academic_title: JSON.parse (message.value).data.academicPosition,
         })
         const head_of_department_doc = await head_of_department.save()
         console.log(head_of_department_doc);

    }


    else if (new_role == 'instructor' && pervious_role == 'head_of_department')
    {

        const user = await Head_of_department.findOne({email : JSON.parse (message.value).data.email})

        if (!user)

        {
            throw new BadRequestError("This user does not exist in head of department database")
        }

            // Delete the course itself
        const deleted_head_from_heads = await Head_of_department.findByIdAndDelete(user._id);

        console.log(deleted_head_from_heads);


        const instrcutors = new Instructor({
            _id :JSON.parse(message.value).data._id,
            name : JSON.parse (message.value).data.name ,
            role : JSON.parse (message.value).data.role ,
            program: 0, 
            email: JSON.parse (message.value).data.email,
            password: JSON.parse (message.value).data.password,
            employee_id: 'NA',
            courses: [] ,
            academic_title: JSON.parse (message.value).data.academicPosition,
       })
       const instr_doc = await instrcutors.save()
       console.log(instr_doc);
    }


    else if (new_role == 'coordinator' && pervious_role == 'head_of_department')
    {

        const user = await Head_of_department.findOne({email : JSON.parse (message.value).data.email})

        if (!user)

        {
            throw new BadRequestError("This user does not exist in head of department database")
        }

            // Delete the course itself
        const deleted_head_from_heads = await Head_of_department.findByIdAndDelete(user._id);

        console.log(deleted_head_from_heads);


 
        const add_new_coordinator = new Coordinator({
            _id :JSON.parse(message.value).data._id,
            name : JSON.parse (message.value).data.name ,
            role : JSON.parse (message.value).data.role ,
            program_name: 'NA', 
            email: JSON.parse (message.value).data.email,
            password: JSON.parse (message.value).data.password,
            employee_id: 'NA',
            courses: [] ,
            academic_title: JSON.parse (message.value).data.academicPosition,
        })
        const coordinator_doc = await add_new_coordinator.save()
        console.log(coordinator_doc);
    }



    else if (new_role == 'head_of_department' && pervious_role == 'head_of_department')
    {

        console.log("Duplicate role of head_of_department");
        const event = {
            _id :JSON.parse(message.value).data._id,
            name : JSON.parse (message.value).data.name ,
            email: JSON.parse (message.value).data.email,
            password: JSON.parse (message.value).data.password,
            academic_title: JSON.parse (message.value).data.academicPosition,

        }

        const user = await Head_of_department.findOne({email : JSON.parse (message.value).data.email,})
        if (!user)
        {
            throw new BadRequestError("user not found in database")
        }
        await Head_of_department.findByIdAndUpdate(user._id , event)



    }




    else
        {
            console.log("This user does not belongs to me")
        }

    
   	  },
	})
  }
 
 