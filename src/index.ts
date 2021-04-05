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
  });
});
