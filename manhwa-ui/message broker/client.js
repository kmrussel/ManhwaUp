var amqp = require('amqplib/callback_api');
const amqplib = require('amqplib');
const { v4: uuidvv4 } = require('uuid')


const uuid = uuidvv4();

const scrapeURL = async (url) => {
    const connection = await amqplib.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const q = await channel.assertQueue('', {exclusive: true});

    console.log(' [x] Requesting image and summary from:', url);

    //send client request to rpc_queue
    channel.sendToQueue('rpc_queue', Buffer.from(url.toString()), {
        //send response back to q with a unique id
        replyTo: q.queue,
        correlationId: uuid
    });

    
    //consume data from q
    return(channel.consume(q.queue, msg => {
        //check that correlationId of data matches uuid
        return new Promise ((resolve, reject) => {
            if (msg.properties.correlationId == uuid){
                const successObject = msg.content.toString();
                channel.ack(msg)
                setTimeout(() => {
                    connection.close();
                    process.exit(0);
                }, 500)
                resolve(successObject)
    
            } else {
                const errorObject = 'error'
                reject(errorObject)
            }
        })

    }))
    

}



module.exports = { scrapeURL }