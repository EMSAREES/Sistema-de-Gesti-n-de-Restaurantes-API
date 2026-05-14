import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`erver is running at http://localhost:${PORT}/api`);
    console.log(`erver is running at http://localhost:${PORT}/api-docs`);
});