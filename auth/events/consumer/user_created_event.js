const mongoose = require("mongoose")
const User = require("../../models/users")
const topic = "user-created-topic"
const  kafka = require("salahorg/events/consumer/base-listener")
const { json } = require("express")
 

  const consumer = kafka.consumer({ groupId: 'user_created_adminstartion-service' })
  
  const user_created_consumer = async () => {
	await consumer.connect()
	await consumer.subscribe({ topic })
    console.log("consumer user_created_is up and runing!!!!!!!");

	await consumer.run({
	  // eachBatch: async ({ batch }) => {
	  //   console.log(batch)x
	  // },
	  eachMessage: async  ({   message }) => {
        console.log("Recieved user_created_event!!!!!!!");
		 
		console.log(   JSON.parse (message.value) )

		const user = new User({
		    _id : JSON.parse(message.value)._id,
			 name : JSON.parse (message.value).name ,
			 email : JSON.parse (message.value).email ,
			 password : JSON.parse (message.value).password,
			 employee_id: JSON.parse (message.value).employee_id , 
			 academic_title: JSON.parse (message.value).academic_title ,
			 role : JSON.parse (message.value).role ,
			 isVerified : JSON.parse (message.value).isVerified  , 
			 URL : JSON.parse(message.value).URL
		})
		await user.save()
  	  },
	})
  }
 
module.exports = user_created_consumer


  

 