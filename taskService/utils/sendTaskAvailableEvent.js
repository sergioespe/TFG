const { BrokerAsPromised: Broker, withDefaultConfig } = require("rascal");
const config = withDefaultConfig({
  $schema: "./node_modules/rascal/lib/config/schema.json",
  vhosts: {
    "/": {
      connection: {
        url: "amqp://guest:guest@localhost:5672/",
      },
      exchanges: ["available_task_ex"],
      queues: ["available_task_q"],
      bindings: ["available_task_ex[a.b.c] -> available_task_q"],
      publications: {
        available_task_pub: {
          exchange: "available_task_ex",
          routingKey: "a.b.c",
        },
      },
      subscriptions: {
        available_task_sub: {
          queue: "available_task_q",
          prefetch: 3,
        },
      },
    },
  },
});

module.exports = async function (taskId) {
  try {
    const broker = await Broker.create(config);
    broker.on("error", console.error);

    // Publish a message
    const publication = await broker.publish("available_task_pub", { taskId });
    publication.on("error", console.error);
  } catch (err) {
    console.error(err);
  }
};
