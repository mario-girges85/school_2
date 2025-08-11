const express = require("express");
const userRouter = require("./routers/users");
const app = express();
const port = 3000;
const faker = require("faker");
app.use("/user", userRouter);
console.log(faker.internet.email());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
