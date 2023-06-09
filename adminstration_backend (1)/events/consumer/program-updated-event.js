const topic = "program-updated-topic-src-program"
const  kafka = require("salahorg/events/consumer/base-listener")
const mongoose = require("mongoose")

const shcemaprograms = require('../../models/program');
const Programdb = mongoose.model('programdb', shcemaprograms);

  const consumer = kafka.consumer({ groupId: 'program_updated_program-service2' })
  
  const program_updated_consumer = async () => {

	await consumer.connect()
	await consumer.subscribe({ topic  })
    console.log("consumer program_updated_is up and runing!!!!!!!");

	await consumer.run({
	// eachBatch: async ({ batch }) => {
	//   console.log(batch)x
	// },
	eachMessage: async  ({   message }) => {

    console.log(   JSON.parse (message.value) )
    console.log("iam delete listener adminstration");

      const res = await Programdb.findOne({Program_Id : JSON.parse (message.value).program_code}   )
		const final_doc = await res.updateOne({name : JSON.parse (message.value).name})		 
		console.log(final_doc);
   	  },
	})
  }
 
module.exports = program_updated_consumer


  

 