import application from './server';
import connection from './database';
import { Kafka } from 'kafkajs';

connection.connectToDatabase().then(() => {
  application.listen(3000, '0.0.0.0', async () => {
    const kafka = new Kafka({
      brokers: ['kafka:9092'],
    });

    const producer = kafka.producer();
    await producer.connect();
    await producer.send({
      topic: 'test-topic',
      messages: [{ value: 'Hello KafkaJS user!' }],
    });
    await producer.disconnect();

    const consumer = kafka.consumer({ groupId: 'test-group' });

    await consumer.connect();
    await consumer.subscribe({ topic: 'test-topic' });
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
        console.log(`- ${prefix} ${message.key}#${message.value}`);
      },
    });
  });
});
