// this is the topic to which we want to write messages
const topic = "program-updated-topic-src-admin"
const producer  = require("salahorg/events/producer/base-publisher") 

     // we define an async function that writes a new message each second
     const produce = async (program) => {
        await producer.connect()
        console.log("program_updated_producer is up and running");
         
        // after the produce has connected, we start an interval timer
     
        try {
        // send a message to the configured topic with
        // the key and value formed from the current value of `i`
        await producer.send({
        topic,
        acks: 1,
        messages: [{value : JSON.stringify(program) }]
                })
    
        console.log("producer is up now and running");
     }
        catch (err) 
        {console.error("could not write message " + err)}
            
         
    
    }
    
module.exports =  produce , producer