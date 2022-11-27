// const { Kafka } = require('kafkajs')

// const kafka = new Kafka({
//     brokers: ['tcp://stgwems01g3:57242']
// })

// // url: tcp://stgwems01g3:57242
// // user: lclkafkaconn
// // pwd: raas12#
// // EMS Topic: HET.TEST.HAR.KAFKAPOC.PUB

// const producer = kafka.producer()
// const consumer = kafka.consumer({ groupId: 'test-group' })

// const run = async () => {
//     // Producing
//     //   await producer.connect()
//     //   await producer.send({
//     //     topic: 'HET.TEST.HAR.KAFKAPOC.PUB',
//     //     messages: [
//     //       { value: 'Testing from Node App!' },
//     //     ],
//     //   })

//     // Consuming
//     await consumer.connect()
//     await consumer.subscribe({ topic: 'HET.TEST.HAR.KAFKAPOC.PUB', fromBeginning: true })

//     await consumer.run({
//         eachMessage: async ({ topic, partition, message }) => {
//             console.log({
//                 partition,
//                 offset: message.offset,
//                 value: message.value.toString(),
//             })
//         },
//     })
// }

// run().catch(console.error)



const Pulsar = require('pulsar-client');


(async () => {
    const client = new Pulsar.Client({
        serviceUrl: 'pulsar://localhost:6650',
    });


    const producer = await client.createProducer({
        topic: 'my-topic',
    });


    await producer.send({
        data: Buffer.from("Hello, Pulsar"),
    });


    await producer.close();



    const consumer = await client.subscribe({
        topic: 'my-topic',
        subscription: 'my-subscription',
    });


    const msg = await consumer.receive();
    console.log(msg.getData().toString());
    consumer.acknowledge(msg);

    await client.close();
})();








