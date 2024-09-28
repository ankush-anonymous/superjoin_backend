const amqp = require("amqplib/callback_api");

// RabbitMQ connection details
const RABBITMQ_URL =
  "amqps://lqxaoajr:xGf1f8TnBVuoauFSMHomS5Kfe3cM55es@puffin.rmq2.cloudamqp.com/lqxaoajr";
const QUEUE = "sheet_sync";

// Function to consume messages from the RabbitMQ queue
const consumeMessages = () => {
  amqp.connect(RABBITMQ_URL, function (error0, connection) {
    if (error0) {
      console.error("Error connecting to RabbitMQ:", error0);
      return;
    }

    connection.createChannel(function (error1, channel) {
      if (error1) {
        console.error("Error creating channel:", error1);
        return;
      }

      channel.assertQueue(QUEUE, { durable: true });
      console.log(
        ` [*] Waiting for messages in ${QUEUE}. To exit press CTRL+C`
      );

      channel.consume(
        QUEUE,
        function (msg) {
          const message = JSON.parse(msg.content.toString());
          console.log(" [x] Received %s", message);

          // Process the message
          processMessage(message);

          // Acknowledge the message
          channel.ack(msg);
        },
        { noAck: false }
      );
    });
  });
};

// Function to process the incoming message
const processMessage = async (message) => {
  try {
    // Extract relevant data from the message
    const items = message; // You might need to adjust this based on the message format

    // Here, implement your logic to update the PostgreSQL database
    // Example:
    // await updateDatabase(items);

    console.log(
      "Database updated successfully with the following items:",
      items
    );
  } catch (error) {
    console.error("Error processing message:", error);
  }
};

// Export the consumeMessages function
module.exports = { consumeMessages };
