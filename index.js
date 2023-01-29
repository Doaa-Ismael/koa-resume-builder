const mongoose = require("mongoose");
const dotEnv = require("dotenv");

const { app } = require("./app");

dotEnv.config();

mongoose.connect(process.env.DATABASE_URL);
app.listen(process.env.PORT || 3000);
