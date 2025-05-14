-- CreateTable
CREATE TABLE "User" (
    "userid" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userid")
);

-- CreateTable
CREATE TABLE "Event" (
    "eventid" SERIAL NOT NULL,
    "eventname" TEXT NOT NULL,
    "userid" INTEGER NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("eventid")
);

-- CreateTable
CREATE TABLE "Task" (
    "taskid" SERIAL NOT NULL,
    "taskname" TEXT NOT NULL,
    "description" TEXT,
    "priority" TEXT NOT NULL,
    "duedate" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "eventid" INTEGER NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("taskid")
);

-- CreateTable
CREATE TABLE "SubTask" (
    "subtaskid" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "taskid" INTEGER NOT NULL,

    CONSTRAINT "SubTask_pkey" PRIMARY KEY ("subtaskid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("userid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_eventid_fkey" FOREIGN KEY ("eventid") REFERENCES "Event"("eventid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubTask" ADD CONSTRAINT "SubTask_taskid_fkey" FOREIGN KEY ("taskid") REFERENCES "Task"("taskid") ON DELETE CASCADE ON UPDATE CASCADE;
