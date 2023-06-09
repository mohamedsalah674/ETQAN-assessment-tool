// this is the topic to which we want to write messages
const topic = "course-created-topic-src-course"

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const producer  = require("salahorg/events/producer/base-publisher") 

     // we define an async function that writes a new message each second
     export const produce_course_created = async (course) => {
        await producer.connect()
        console.log("User_created_producer is up and running");
         
        // after the produce has connected, we start an interval timer
     
        try {
        // send a message to the configured topic with
        // the key and value formed from the current value of `i`
        await producer.send({
        topic,
        acks: 1,
        messages: [{value : JSON.stringify(course) }]
                })
    
        console.log("producer is up now and running");
     }
        catch (err) 
        {console.error("could not write message " + err)}
            
         
    
    }
    