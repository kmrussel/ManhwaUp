const express = require('express')
var amqp = require('amqplib/callback_api');
const amqplib = require('amqplib');
const { v4: uuidvv4 } = require('uuid')
const router = express.Router()


// Citation for the following function
// Date: 08.07.22
// Altered from:
// https://www.rabbitmq.com/tutorials/tutorial-six-javascript.html

router.post('/get-data', async (req, res) => {

    const uuid = uuidvv4();
    const url = req.body.url

    if (!url) {
        res.sendStatus(400)
    }

    const scrapeURL = async (url) => {
        const connection = await amqplib.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const q = await channel.assertQueue('', { exclusive: true });

        console.log(' [x] Requesting image and summary from:', url);

        //send client request to rpc_queue
        channel.sendToQueue('rpc_queue', Buffer.from(url.toString()), {
            //send response back to q with a unique id
            replyTo: q.queue,
            correlationId: uuid
        });

        //consume data from q
        channel.consume(q.queue, msg => {

            //check that correlationId of data matches uuid
            try {
                if (msg.properties.correlationId == uuid) {
                    connection.close();
                    const message = msg.content.toString()
                    if (message !== 'error') {
                        res.status(201).json(JSON.parse(message)[0]);
                    } else {
                        res.status(404).json({ error: 'invalid url' })
                    }

                }
            } catch (error) {
                console.error(error)
                res.sendStatus(401)
            }

        }, { noAck: true })
    }

    scrapeURL(url);
})

module.exports = router