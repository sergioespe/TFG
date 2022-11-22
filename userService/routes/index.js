const express = require("express");
const router = express.Router();
const db = require("db");
const sendUserAvailableEvent = require("../utils/sendUserAvailableEvent");
const sendTaskAvailableEvent = require("../utils/sendTaskAvailableEvent");

router.get("/", async (req, res) => {
  const users = await db.user.findMany({
    where: {
      removed: {
        equals: false,
      },
    },
  });
  res.json(users);
}); //BIEN

router.post(`/`, async (req, res) => {
  const { id_slack, name, email, password, role, max_words } = req.body;
  const user = await db.user.create({
    data: {
      id_slack,
      name,
      email,
      password,
      role,
      max_words,
      current_availability: max_words,
      last_assignment: new Date(),
      removed: false,
    },
  });

  sendUserAvailableEvent(user.id);

  res.json(user);
}); //BIEN

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await db.user.findUnique({ where: { id } });
  res.json(user);
}); //BIEN

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  const updatedUser = await db.user.update({
    where: { id },
    data: {
      ...req.body,
    },
  });
  res.json(updatedUser);
}); //BIEN

router.delete(`/:id`, async (req, res) => {
  const { id } = req.params;
  const user = await db.user.findUnique({
    where: { id },
    select: {
      assignedTasks: {
        where: { status: { not: "COMPLETED" } },
      },
    },
  });

  await db.user.update({
    where: { id },
    data: {
      removed: true,
      assignedTasks: {
        disconnect: user.assignedTasks.map(({ id }) => ({ id })),
      },
    },
  });

  user.assignedTasks.forEach((task) => {
    sendTaskAvailableEvent(task.id);
  });

  res.json();
}); //BIEN

module.exports = router;
