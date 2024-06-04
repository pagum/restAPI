const express = require("express");
const studentRoutes = require("./src/student/routes");
const config = require("platformsh-config").config();

const app = express();
const port = config.isValidPlatform() ? config.port : 3000;

//middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/v1/students", studentRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));
