const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const Worker1 = await prisma.user.create({
    data: {
      id_slack: "1",
      name: "Juan",
      email: "juan@gmail.com",
      password: "1234",
      role: "MANAGER",
      max_words: 2000,
      current_availability: 2000,
      last_assignment: new Date("2019-01-16 09:00:00"),
      removed: false,
    },
  });

  const Worker2 = await prisma.user.create({
    data: {
      id_slack: "2",
      name: "Luis",
      email: "luisito@hotmail.es",
      password: "1234",
      role: "WORKER",
      max_words: 2000,
      current_availability: 2000,
      last_assignment: new Date("2019-01-16 09:00:00"),
      removed: false,
    },
  });

  const Worker3 = await prisma.user.create({
    data: {
      id_slack: "3",
      name: "Ester",
      email: "ester@gmail.com",
      password: "1234",
      role: "WORKER",
      max_words: 2000,
      current_availability: 2000,
      last_assignment: new Date("2019-01-16 09:00:00"),
      removed: false,
    },
  });

  const Worker4 = await prisma.user.create({
    data: {
      id_slack: "4",
      name: "Nuria",
      email: "nuria@correo.com",
      password: "1234",
      role: "WORKER",
      max_words: 2000,
      current_availability: 2000,
      last_assignment: new Date("2019-01-16 09:00:00"),
      removed: false,
    },
  });

  const Task1 = await prisma.task.create({
    data: {
      url: "https://google.com",
      payload: "Demo 254B - Inglés (ES-EN)",
      word_length: 200,
      status: "PENDING",
      update_time: new Date("2022-07-10"),
      due_date: new Date("2022-07-10"),
    },
  });

  const Task2 = await prisma.task.create({
    data: {
      url: "https://google.com",
      payload: "Demo 245C - Francés (ES-FR)",
      word_length: 300,
      status: "REVIEW",
      update_time: new Date("2022-07-10"),
      due_date: new Date("2022-07-10"),
    },
  });

  const Task3 = await prisma.task.create({
    data: {
      url: "https://google.com",
      payload: "Demo 238A - Rumano (ES-RU)",
      word_length: 400,
      status: "COMPLETED",
      update_time: new Date("2022-07-10"),
      due_date: new Date("2022-07-10"),
    },
  });

  const Task4 = await prisma.task.create({
    data: {
      url: "https://google.com",
      payload: "Demo 243D - Portugués (ES-PT)",
      word_length: 350,
      status: "PENDING",
      update_time: new Date("2022-07-10"),
      due_date: new Date("2022-07-10"),
    },
  });

  const Task5 = await prisma.task.create({
    data: {
      url: "https://google.com",
      payload: "Demo 213B - Inglés (ES-EN)",
      word_length: 270,
      status: "REVIEW",
      update_time: new Date("2022-07-10"),
      due_date: new Date("2022-07-10"),
    },
  });

  const Task6 = await prisma.task.create({
    data: {
      url: "https://google.com",
      payload: "Demo 221A - Español (RU-ES)",
      word_length: 410,
      status: "COMPLETED",
      update_time: new Date("2022-07-10"),
      due_date: new Date("2022-07-10"),
    },
  });

  await prisma.user.update({
    where: { id: Worker1.id },
    data: {
      assignedTasks: {
        connect: {
          id: Task1.id,
        },
      },
      translatedTasks: {
        connect: {
          id: Task2.id,
        },
      },
    },
  });

  await prisma.user.update({
    where: { id: Worker1.id },
    data: {
      assignedTasks: {
        connect: {
          id: Task6.id,
        },
      },
    },
  });

  await prisma.user.update({
    where: { id: Worker2.id },
    data: {
      assignedTasks: {
        connect: {
          id: Task2.id,
        },
      },
      translatedTasks: {
        connect: {
          id: Task3.id,
        },
      },
    },
  });

  await prisma.user.update({
    where: { id: Worker3.id },
    data: {
      assignedTasks: {
        connect: {
          id: Task3.id,
        },
      },
      translatedTasks: {
        connect: {
          id: Task5.id,
        },
      },
    },
  });

  await prisma.user.update({
    where: { id: Worker4.id },
    data: {
      assignedTasks: {
        connect: {
          id: Task4.id,
        },
      },
      translatedTasks: {
        connect: {
          id: Task6.id,
        },
      },
    },
  });

  await prisma.user.update({
    where: { id: Worker4.id },
    data: {
      assignedTasks: {
        connect: {
          id: Task5.id,
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
