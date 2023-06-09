const topic = "course-updated-topic-src-course"
const  kafka = require("salahorg/events/consumer/base-listener")
const mongoose = require("mongoose")

const shcemaCourses = require('../../models/course');
const Coursedb = mongoose.model('coursedb', shcemaCourses);

  const consumer = kafka.consumer({ groupId: 'course_updated_course-service2' })
  
  const course_updated_consumer = async () => {

	await consumer.connect()
	await consumer.subscribe({ topic  })
    console.log("consumer course_updated_is up and runing!!!!!!!");

	await consumer.run({
	// eachBatch: async ({ batch }) => {
	//   console.log(batch)x
	// },
	eachMessage: async  ({   message }) => {

    console.log(   JSON.parse (message.value) )
    console.log("iam delete listener adminstration");

      const res = await Coursedb.findOne({course_code : JSON.parse (message.value).code}   )
	  if (res) 
{		const final_doc = await res.updateOne({name : JSON.parse (message.value).name})		 
		console.log(final_doc);}
   	  },
	})
  }
 
module.exports = course_updated_consumer


  

 