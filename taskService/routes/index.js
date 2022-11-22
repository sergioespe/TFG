const express = require("express");
const router = express.Router();
const db = require("db");
const sendTaskAvailableEvent = require("../utils/sendTaskAvailableEvent");
const sendUserAvailableEvent = require("../utils/sendUserAvailableEvent");

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    global
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

router.get("/", async (req, res) => {
  const token = req.header("authorization");
  const {
    user: { id, role },
  } = parseJwt(token);
  if (role === "MANAGER") {
    const tasks = await db.task.findMany({
      include: {
        assignee: {
          select: {
            name: true,
          },
        },
        translator: {
          select: {
            name: true,
          },
        },
      },
    });
    res.json(tasks);
  } else {
    const tasks = await db.task.findMany({
      where: {
        assigneeId: id,
      },
      include: {
        assignee: {
          select: {
            name: true,
          },
        },
        translator: {
          select: {
            name: true,
          },
        },
      },
    });
    res.json(tasks);
  }
}); //BIEN

router.post(`/`, async (req, res) => {
  const { payload, url, word_length, due_date } = req.body;
  const task = await db.task.create({
    data: {
      payload,
      url,
      word_length,
      due_date,
      status: req.body.status || "PENDING",
      update_time: new Date(Date.now()),
    },
  });
  sendTaskAvailableEvent(task.id);
  res.json(task);
}); //BIEN

//Cambia el asignado a el traductor, pasa la tarea a REVIEW y actualiza el update_time
router.post(`/:id/complete-translation`, async (req, res) => {
  const { id } = req.params;
  const task = await db.task.findUnique({ where: { id } });

  await db.user.update({
    where: { id: task.assigneeId },
    data: {
      current_availability: {
        increment: task.word_length,
      },
    },
  });

  const updateTask = await db.task.update({
    where: { id },
    data: {
      status: "REVIEW",
      assigneeId: null,
      translatorId: task.assigneeId,
      update_time: new Date(Date.now()),
    },
  });

  sendTaskAvailableEvent(updateTask.id);
  sendUserAvailableEvent(task.assigneeId);

  res.json(updateTask);
}); // BIEN

//Esto cambia el status de la tarea a COMPLETED
router.post(`/:id/validate-translation`, async (req, res) => {
  const { id } = req.params;
  const task = await db.task.findUnique({ where: { id } });

  await db.user.update({
    where: { id: task.assigneeId },
    data: {
      current_availability: {
        increment: task.word_length,
      },
    },
  });

  const updatedTask = await db.task.update({
    where: { id },
    data: {
      status: "COMPLETED",
    },
  });

  sendUserAvailableEvent(updatedTask.assigneeId);

  res.json(updatedTask);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const task = await db.task.findUnique({ where: { id } });
  res.json(task);
}); //BIEN

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  const updatedTask = await db.task.update({
    where: { id },
    data: {
      ...req.body,
      update_time: new Date(Date.now()),
    },
  });
  res.json(updatedTask);
}); //BIEN (los enlaces de traductor y asignado lo haremos en otro metodo)

router.delete(`/:id`, async (req, res) => {
  const { id } = req.params;
  const post = await db.task.delete({ where: { id } });
  res.json(post);
}); //BIEN

module.exports = router;
