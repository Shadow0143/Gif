const express = require('express');
const path = require('path');
const Routers = require("./routers/main.router");
const app = express();
const port = 3001;

app.use(express.json());

app.use("/", Routers);
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
