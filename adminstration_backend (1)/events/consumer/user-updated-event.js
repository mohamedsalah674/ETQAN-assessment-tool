const mongoose = require("mongoose")
const User = require("../../models/user")
const Allusersdb = mongoose.model('allusersdb', User);

const topic = "user-updated-topic-src-auth"
const  kafka = require("salahorg/events/consumer/base-listener")
 
  const consumer = kafka.consumer({ groupId: 'user_updated_authentication-service' })
  
  const user_updated_consumer = async () => {

	await consumer.connect()
	await consumer.subscribe({ topic  })
    console.log("consumer user_updated_is up and runing!!!!!!!");

	await consumer.run({
	// eachBatch: async ({ batch }) => {
	//   console.log(batch)x
	// },
	eachMessage: async  ({   message }) => {

    console.log(   JSON.parse (message.value) )
    console.log("iam delete listener");

      await Allusersdb.findOneAndUpdate({email : JSON.parse (message.value).email} , JSON.parse (message.value) , { useFindAndModify: false})
		 
 
   	  },
	})
  }
 
module.exports = user_updated_consumer


  

 