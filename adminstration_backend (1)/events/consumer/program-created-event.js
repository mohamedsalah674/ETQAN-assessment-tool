const topic = "program-created-topic-src-program"
const  kafka = require("salahorg/events/consumer/base-listener")
const mongoose = require("mongoose")

const shcemaprograms = require('../../models/program');
const Programdb = mongoose.model('programdb', shcemaprograms);

  const consumer = kafka.consumer({ groupId: 'program_created-program-service2' })
  
  const program_created_consumer = async () => {
	await consumer.connect()
	await consumer.subscribe({ topic })
    console.log("consumer program_created_is up and runing!!!!!!!");

	await consumer.run({
	  
	  eachMessage: async  ({   message }) => {
        console.log("Recieved program_created_event!!!!!!!");
		 
		console.log(   JSON.parse (message.value) )
        
      //   Example    
        const program = new Programdb({
            name : JSON.parse (message.value).name ,
            Program_Id : JSON.parse (message.value).program_code ,
       })

       program.save()

  	  }
	})
  }
 
module.exports = program_created_consumer


  

 