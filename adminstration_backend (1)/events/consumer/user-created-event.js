const mongoose = require("mongoose")
const User = require("../../models/user")
const Allusersdb = mongoose.model('allusersdb', User);
const topic = "user-created-topic-src-auth"
const  kafka = require("salahorg/events/consumer/base-listener")
 
  const consumer = kafka.consumer({ groupId: 'user_created_authentication-service' })
  
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

		const user = new Allusersdb({
			 _id : JSON.parse(message.value)._id ,
			 name : JSON.parse (message.value).name ,
			 email : JSON.parse (message.value).email ,
			 password : JSON.parse (message.value).password,
			 academicPosition: JSON.parse (message.value).academicPosition , 
			 role : JSON.parse (message.value).role , 
             isVerified : true ,
             URL : JSON.parse (message.value).URL , 

		})
		user.save()
  	  },
	})
  }
 
module.exports = user_created_consumer


  

 