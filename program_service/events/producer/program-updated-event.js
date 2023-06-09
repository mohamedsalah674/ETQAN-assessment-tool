// this is the topic to which we want to write messages
const topic = "program-updated-topic-src-program2"
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const  producer  = require("salahorg/events/producer/base-publisher") 

     // we define an async function that writes a new message each second
     export const produce_program_updated = async (program) => {
        await producer.connect()
        console.log("Program_created_producer is up and running");
         
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
    
 