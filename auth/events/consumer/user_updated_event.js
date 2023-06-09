const mongoose = require("mongoose")
const User = require("../../models/users")

const topic = "user-updated-topic"
const  kafka = require("salahorg/events/consumer/base-listener")
 
  const consumer = kafka.consumer({ groupId: 'user_updated_adminstartion-service' })
  
  const user_updated_consumer = async () => {

	await consumer.connect()
	await consumer.subscribe({ topic  })
    console.log("consumer user_updated_is up and runing!!!!!!!");

	await consumer.run({
	// eachBatch: async ({ batch }) => {
	//   console.log(batch)x
	// },
	eachMessage: async  ({   message }) => {

    console.log(   JSON.parse (message.value).data )
    console.log("iam delete listener");
	const event ={
		name : JSON.parse (message.value).data.name,
		email : JSON.parse (message.value).data.email,
		password : JSON.parse (message.value).data.password,
		role : JSON.parse (message.value).data.role,
		academicPosition : JSON.parse (message.value).data.academicPosition,
		isVerified : JSON.parse (message.value).data.isVerified,
		URL : JSON.parse (message.value).data.URL,
	}

      await User.findOneAndUpdate({email : JSON.parse (message.value).data.email} , event , { useFindAndModify: false})
		 
 
   	  },
	})
  }
 
module.exports = user_updated_consumer


  

 