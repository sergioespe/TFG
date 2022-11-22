const { BrokerAsPromised: Broker, withDefaultConfig } = require("rascal");
const config = withDefaultConfig({
  $schema: "./node_modules/rascal/lib/config/schema.json",
  vhosts: {
    "/": {
      connection: {
        url: "amqp://guest:guest@localhost:5672/",
      },
      exchanges: ["available_user_ex"],
      queues: ["available_user_q"],
      bindings: ["available_user_ex[a.b.c] -> available_user_q"],
      publications: {
        available_user_pub: {
          exchange: "available_user_ex",
          routingKey: "a.b.c",
        },
      },
      subscriptions: {
        available_user_sub: {
          queue: "available_user_q",
          prefetch: 3,
        },
      },
    },
  },
});

module.exports = async function (userId) {
  try {
    const broker = await Broker.create(config);
    broker.on("error", console.error);

    // Publish a message
    const publication = await broker.publish("available_user_pub", { userId });
    publication.on("error", console.error);
  } catch (err) {
    console.error(err);
  }
};
