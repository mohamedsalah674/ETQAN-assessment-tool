const topic = "course-created-topic-src-course"
const  kafka = require("salahorg/events/consumer/base-listener")
const mongoose = require("mongoose")

const shcemaCourses = require('../../models/course');
const Coursedb = mongoose.model('coursedb', shcemaCourses);

  const consumer = kafka.consumer({ groupId: 'course_created-course-service2' })
  
  const course_created_consumer = async () => {
	await consumer.connect()
	await consumer.subscribe({ topic })
    console.log("consumer course_created_is up and runing!!!!!!!");

	await consumer.run({
	  
	  eachMessage: async  ({   message }) => {
        console.log("Recieved course_created_event!!!!!!!");
		 
		console.log(   JSON.parse (message.value) )
        
      //   Example    
        const Course = new Coursedb({
            name : JSON.parse (message.value).name ,
            course_code : JSON.parse (message.value).code ,
       })

      await Course.save()

  	  }
	})
  }
 
module.exports = course_created_consumer


  

 