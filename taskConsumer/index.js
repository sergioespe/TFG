const { BrokerAsPromised: Broker, withDefaultConfig } = require("rascal");
const db = require("db");

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
      subscriptions: {
        available_task_sub: {
          queue: "available_task_q",
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

    const subscription = await broker.subscribe("available_task_sub");
    subscription
      .on("message", (message, { taskId }, ackOrNack) => {
        console.log("Finding user for task " + taskId);
        findTaskForUser(taskId).then(ackOrNack());
      })
      .on("error", console.error);
  } catch (err) {
    console.error(err);
  }
})();

async function findTaskForUser(taskId) {
  const task = await db.task.findUnique({ where: { id: taskId } });
  if (!task) return;

  const userToAssign = await db.user.findFirst({
    where: {
      removed: false,
      current_availability: { gte: task.word_length },
      id: { not: task.assigneeId || undefined },
    },
    orderBy: [{ last_assignment: "asc" }],
  });

  console.log(userToAssign);

  if (!userToAssign) return console.log("No user found");

  await db.user.update({
    where: { id: userToAssign.id },
    data: {
      assignedTasks: {
        connect: {
          id: taskId,
        },
      },
      current_availability: {
        decrement: task.word_length,
      },
      last_assignment: new Date(),
    },
  });

  console.log("Task " + task.id + " assigned to user " + userToAssign.id);
}
