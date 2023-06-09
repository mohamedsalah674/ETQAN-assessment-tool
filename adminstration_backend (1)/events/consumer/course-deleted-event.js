const topic = "course-deleted-topic-src-course"
const  kafka = require("salahorg/events/consumer/base-listener")
const mongoose = require("mongoose")

const shcemaCourses = require('../../models/course');
const Coursedb = mongoose.model('coursedb', shcemaCourses);

  const consumer = kafka.consumer({ groupId: 'course_deleted_course-service2' })
  
  const course_deleted_consumer = async () => {

	await consumer.connect()
	await consumer.subscribe({ topic  })
    console.log("consumer course_deleted_is up and runing!!!!!!!");

	await consumer.run({

	eachMessage: async  ({   message }) => {

    console.log(   JSON.parse (message.value) )
    console.log("iam delete listener adminstartion");

       const document = await Coursedb.findOne({course_code : JSON.parse (message.value).code})
      console.log(document);
      const id = document._id
      console.log(id + "ID");
      const res = await Coursedb.findByIdAndDelete(id)

      console.log(res);
   	  },
	})
  }
 
module.exports = course_deleted_consumer


  

 