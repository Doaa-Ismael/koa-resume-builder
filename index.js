import mongoose from "mongoose";

import { app } from "./app.js";

mongoose.connect(process.env.DATABASE_URL);
app.listen(process.env.PORT || 3000);
