import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
import prisma from "./db/db.config.js";

export const setupSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("event:create", async ({ eventname, userid }) => {
      console.log("Event creation request received:", eventname, userid);
      try {
        const event = await prisma.event.create({ data: { eventname, userid } });
        console.log("Event created:", event);
        io.emit("event:created", event);
      } catch (err) {
        socket.emit("error", { message: "Event creation failed", error: err });
      }
    });

    socket.on("event:delete", async ({ eventid }) => {
      console.log("Event deletion request received:", eventid);
      try {
        await prisma.event.delete({ where: { eventid } });
        io.emit("event:deleted", { eventid });
      } catch (err) {
        socket.emit("error", { message: "Event deletion failed", error: err });
      }
    });

    socket.on("event:getAll", async ({ userid }) => {
      console.log("Fetching all events for user:", userid);
      try {
        const events = await prisma.event.findMany({ where: { userid } });
        socket.emit("event:list", events);
      } catch (err) {
        socket.emit("error", { message: "Fetching events failed", error: err });
      }
    });

    socket.on("task:create", async ({taskname, description, priority, duedate,status, eventid}) => {
      console.log("Task creation request received:", taskname, description, duedate, priority, status, eventid);
        try {
          const task = await prisma.task.create({ data : { taskname, description, priority,duedate, status, eventid } });
          io.emit("task:created", task);
        } catch (err) {
          socket.emit("error", { message: "Task creation failed", error: err });
        }
    });

    socket.on("task:delete", async ({ taskid }) => {
      console.log("Task deletion request received:", taskid);
      try {
        await prisma.task.delete({ where: { taskid } });
        io.emit("task:deleted", { taskid });
      } catch (err) {
        socket.emit("error", { message: "Task deletion failed", error: err });
      }
    });

    socket.on("task:updatePriority", async ({ taskid, priority }) => {
      console.log("Task priority update request received:", taskid, priority);
      try {
        const task = await prisma.task.update({ where: { taskid }, data: { priority } });
        io.emit("task:updated", task);
      } catch (err) {
        socket.emit("error", { message: "Priority update failed", error: err });
      }
    });

    socket.on("task:updateStatus", async ({ taskid, status }) => {
      console.log("Task status update request received:", taskid, status);
      try {
        const task = await prisma.task.update({ where: { taskid }, data: { status } });
        io.emit("task:updated", task);
      } catch (err) {
        socket.emit("error", { message: "Status update failed", error: err });
      }
    });

    socket.on("task:getAll", async ({ eventid }) => {
      console.log("Fetching all tasks for event:", eventid);
      try {
        const tasks = await prisma.task.findMany({ where: { eventid } });
        socket.emit("task:list", tasks);
      } catch (err) {
        socket.emit("error", { message: "Fetching tasks failed", error: err });
      }
    });

    socket.on("task:getLow", async ({ eventid }) => {
      console.log("Fetching low priority tasks for event:", eventid);
      const tasks = await prisma.task.findMany({ where: { eventid, priority: "low" } });
      socket.emit("task:priority", tasks);
    });

    socket.on("task:getMedium", async ({ eventid }) => {
      console.log("Fetching medium priority tasks for event:", eventid);
      const tasks = await prisma.task.findMany({ where: { eventid, priority: "medium" } });
      socket.emit("task:priority", tasks);
    });

    socket.on("task:getHigh", async ({ eventid }) => {
      console.log("Fetching high priority tasks for event:", eventid);
      const tasks = await prisma.task.findMany({ where: { eventid, priority: "high" } });
      socket.emit("task:priority", tasks);
    });

    socket.on("subtask:create", async ({ name, taskid }) => {
      console.log("Subtask creation request received:", name, taskid);
      try {
        const subtask = await prisma.subTask.create({ data: { name, taskid } });
        io.emit("subtask:created", subtask);
      } catch (err) {
        socket.emit("error", { message: "Subtask creation failed", error: err });
      }
    });

    socket.on("subtask:delete", async ({ subtaskid }) => {
      console.log("Subtask deletion request received:", subtaskid);
      try {
        await prisma.subTask.delete({ where: { subtaskid } });
        io.emit("subtask:deleted", { subtaskid });
      } catch (err) {
        socket.emit("error", { message: "Subtask deletion failed", error: err });
      }
    });


    socket.on("subtask:getAll", async ({ taskid }) => {
      console.log("Fetching all subtasks for task:", taskid);
      try {
        const subtasks = await prisma.subTask.findMany({ where: { taskid } });
        socket.emit("subtask:list", subtasks);
      } catch (err) {
        socket.emit("error", { message: "Fetching subtasks failed", error: err });
      }
    });
  });
};
