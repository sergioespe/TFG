const { BrokerAsPromised: Broker, withDefaultConfig } = require("rascal");
const db = require("db");

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
      subscriptions: {
        available_user_sub: {
          queue: "available_user_q",
          prefetch: 3,
        },
      },
    },
  },
});

(async () => {
  try {
    const broker = await Broker.create(config);
    broker.on("error", console.error);

    const subscription = await broker.subscribe("available_user_sub");
    subscription
      .on("message", (message, { userId }, ackOrNack) => {
        console.log("Finding task for user " + userId);
        findTaskForUser(userId).then(ackOrNack());
      })
      .on("error", console.error);
  } catch (err) {
    console.error(err);
  }
})();

async function findTaskForUser(userId) {
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user || user.current_availability <= 0) return;

  console.log(user);

  const taskToAssign = await db.task.findFirst({
    where: {
      OR: [
        {
          translatorId: { not: userId },
        },
        {
          translatorId: null,
        },
      ],
      word_length: { lte: user.current_availability },
      assigneeId: null,
    },
    orderBy: [{ update_time: "asc" }],
  });

  console.log(taskToAssign);

  if (!taskToAssign) return console.log("No tasks found");

  await db.user.update({
    where: { id: userId },
    data: {
      assignedTasks: {
        connect: {
          id: taskToAssign.id,
        },
      },
      current_availability: {
        decrement: taskToAssign.word_length,
      },
      last_assignment: new Date(),
    },
  });

  console.log("Task " + taskToAssign.id + " assigned to user " + userId);
}
