const topic = "program-deleted-topic-src-program"
const  kafka = require("salahorg/events/consumer/base-listener")
const mongoose = require("mongoose")

const shcemaprograms = require('../../models/program');
const Programdb = mongoose.model('programdb', shcemaprograms);

  const consumer = kafka.consumer({ groupId: 'program_deleted_program-service2' })
  
  const program_deleted_consumer = async () => {

	await consumer.connect()
	await consumer.subscribe({ topic  })
    console.log("consumer program_deleted_is up and runing!!!!!!!");

	await consumer.run({

	eachMessage: async  ({   message }) => {

    console.log(   JSON.parse (message.value) )
    console.log("iam delete listener adminstartion");

       const document = await Programdb.findOne({Program_Id : JSON.parse (message.value).program_code})
      console.log(document);
      const id = document._id
      console.log(id + "ID");
      const res = await Programdb.findByIdAndDelete(id)

      console.log(res);
   	  },
	})
  }
 
module.exports = program_deleted_consumer


  

 