const mongoose = require("mongoose");

const { app } = require("./app");

mongoose.connect(process.env.DATABASE_URL);
app.listen(process.env.PORT || 3000);
