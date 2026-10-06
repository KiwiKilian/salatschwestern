import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

config();

const configService = new ConfigService();

export const postgresConnectionOptions: PostgresConnectionOptions = {
  type: "postgres",
  host: configService.get("POSTGRES_HOST"),
  port: configService.get("POSTGRES_PORT"),
  username: configService.get("POSTGRES_USER"),
  password: configService.get("POSTGRES_PASSWORD"),
  database: configService.get("POSTGRES_DB"),
  entities: [configService.get("TYPEORM_ENTITIES") as string],
  migrations: [configService.get("TYPEORM_MIGRATIONS") as string],
  migrationsRun: configService.get("TYPEORM_MIGRATIONS_RUN") === "true",
  synchronize: configService.get("TYPEORM_SYNCHRONIZE") === "true",
};

export const postgresDataSource = new DataSource(postgresConnectionOptions);
