const mariadb = require("mariadb");
const pool = mariadb.createPool({
  host: "localhost", //host
  port: 3306, //port
  user: "root", //username
  password: "root", //password,
  database: "test", //db name,
  connectionLimit: 1,
});

async function setEnvironment() {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log("got connection");
    const rows = await conn.query("SELECT * from application_properties");
    for (let row of rows) {
      process.env[row.name] = row.value;
    }
    console.log("environment variables are all set :)");
    if (conn) {
      console.log("terminating connection");
      return conn.end();
    }
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.end();
  }
}

async function main() {
  await setEnvironment();
  console.log("enviroment varaibles key1 = " + process.env.key1);
  return pool.end();
}

main();
