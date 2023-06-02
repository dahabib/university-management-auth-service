import mongoose from "mongoose";
import app from "./app";

const bootstrap = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
    console.log(`Database connected successfully!`);
    app.listen(process.env.PORT, () => {
      console.log(`Application is listening on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.log(`Failed to cennect with database!`, err);
  }
};

bootstrap();
