import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const connectionString = process.env.DATABASE_URL!;

const adapter = new PrismaBetterSqlite3({ url: connectionString });
const prisma = new PrismaClient({ adapter });

export default prisma;

// mirando informacion lo mas seguro que esta es la conexion y no se ocupara db.ts