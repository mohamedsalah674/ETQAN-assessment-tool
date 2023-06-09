// this is the topic to which we want to write messages
const topic = "department-created-topic-src-admin"
const producer  = require("salahorg/events/producer/base-publisher") 

     // we define an async function that writes a new message each second
     const produce = async (department) => {
        await producer.connect()
        console.log("department_created_producer is up and running");
         
        // after the produce has connected, we start an interval timer
     
        try {
        // send a message to the configured topic with
        // the key and value formed from the current value of `i`
        await producer.send({
        topic,
        acks: 1,
        messages: [{value : JSON.stringify(department) }]
                })
    
        console.log("producer is up now and running");
     }
        catch (err) 
        {console.error("could not write message " + err)}
            
         
    
    }
    
module.exports =  produce