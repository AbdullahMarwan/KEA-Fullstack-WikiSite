import { AppDataSource } from "./data-source";

const dbConnectMysql = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Connected to MySQL database");
    return true;
  } catch (error) {
    console.error("Error connecting to MySQL database:", error);
    return false;
  }
};

export default dbConnectMysql;
