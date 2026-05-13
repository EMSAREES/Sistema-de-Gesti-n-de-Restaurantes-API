import Database from "better-sqlite3";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

let db: ReturnType<typeof Database>

try {
    if (!process.env.SQLITE_PATH) {
        throw new Error("SQLITE_PATH no está definido en el archivo .env");
    }

    // db = new Database(
    //     path.resolve(__dirname, process.env.SQLITE_PATH),
    //     { verbose: console.log }
    // );

    db = new Database(
    path.resolve(process.cwd(), process.env.SQLITE_PATH),
    { verbose: console.log }
);

    console.log("Conexión a SQLite establecida correctamente ");
} catch (error) {
    console.error("Error al inicializar la base de datos:", error);
    process.exit(1); // salir del proceso si no hay conexión
}

export default db;





