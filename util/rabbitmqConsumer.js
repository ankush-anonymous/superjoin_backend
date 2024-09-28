const amqp = require("amqplib/callback_api");
const { syncSheet } = require("../controllers/syncController"); // Import the syncSheet controller

// RabbitMQ connection details
const RABBITMQ_URL =
  "amqps://swyvhyqm:qZLvJn3NjeT-g-uPeKiNoOLaoOkjjf4m@puffin.rmq2.cloudamqp.com/swyvhyqm";
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
    // The message is expected to contain sheet data
    const req = { body: message }; // Wrap the message in a req-like object
    const res = {
      status: (statusCode) => ({
        send: (msg) => console.log(`Response: ${statusCode} - ${msg}`),
      }),
    };

    // Call the syncSheet function
    await syncSheet(req, res);
  } catch (error) {
    console.error("Error processing message:", error);
  }
};

// Export the consumeMessages function
module.exports = { consumeMessages };
