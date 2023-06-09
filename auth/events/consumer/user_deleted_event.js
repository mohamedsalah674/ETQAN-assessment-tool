const mongoose = require("mongoose")
const User = require("../../models/users")

const topic = "user-deleted-topic"
const  kafka = require("salahorg/events/consumer/base-listener")
 
  const consumer = kafka.consumer({ groupId: 'user_deleted_adminstartion-service' })
  
  const user_deleted_consumer = async () => {

	await consumer.connect()
	await consumer.subscribe({ topic  })
    console.log("consumer user_deleted_is up and runing!!!!!!!");

	await consumer.run({
	// eachBatch: async ({ batch }) => {
	//   console.log(batch)x
	// },
	eachMessage: async  ({   message }) => {

    console.log(   JSON.parse (message.value) )
    console.log("iam delete listener");

     const doc =  await User.findOne({email : JSON.parse (message.value).email})
		const final_doc =  await User.findByIdAndDelete(doc._id)
		console.log(final_doc);
   	  },
	})
  }
 
module.exports = user_deleted_consumer


  

 