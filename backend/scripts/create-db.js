// require('dotenv').config();
// const fs = require('fs');
// const path = require('path');
// const mysql = require('mysql2/promise');

// async function main(){
//   const DB_HOST = process.env.DB_HOST || 'localhost';
//   const DB_PORT = process.env.DB_PORT || 3306;
//   const DB_USER = process.env.DB_USER || 'root';
//   const DB_PASS = process.env.DB_PASS || '';
//   const DB_NAME = process.env.DB_NAME || 'store_ratings';

//   const sqlPath = path.resolve(__dirname, '..', '..', 'sql', 'schema.sql');
//   if (!fs.existsSync(sqlPath)){
//     console.error('schema.sql not found at', sqlPath);
//     process.exit(1);
//   }

//   const sql = fs.readFileSync(sqlPath, 'utf8');

//   console.log('Connecting to MySQL server...');
//   const conn = await mysql.createConnection({ host: DB_HOST, port: DB_PORT, user: DB_USER, password: DB_PASS, multipleStatements: true });
//   try{
//     console.log(`Creating database '${DB_NAME}' if it does not exist...`);
//     await conn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;`);
//     console.log('Importing schema from', sqlPath);
//     // run the full schema file; it includes USE statement
//     await conn.query(sql);
//     console.log('Database ready.');
//     process.exit(0);
//   }catch(err){
//     console.error('Error creating database:', err.message || err);
//     process.exit(2);
//   }finally{
//     await conn.end();
//   }
// }

// main();





require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

async function main() {
  const DB_HOST = process.env.DB_HOST || 'localhost';
  const DB_PORT = parseInt(process.env.DB_PORT) || 5432;
  const DB_USER = process.env.DB_USER || 'postgres';
  const DB_PASS = process.env.DB_PASS || '';
  const DB_NAME = process.env.DB_NAME || 'store_ratings';

  const schemaPath = path.resolve(__dirname, '..', 'sql', 'schema.sql');
  if (!fs.existsSync(schemaPath)) {
    console.error('schema.sql not found at', schemaPath);
    process.exit(1);
  }

  // Step 1: Connect to default 'postgres' db to create our db if needed
  const adminClient = new Client({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASS,
    database: 'postgres'
  });

  try {
    console.log('Connecting to PostgreSQL server...');
    await adminClient.connect();

    const res = await adminClient.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`, [DB_NAME]
    );

    if (res.rowCount === 0) {
      console.log(`Creating database '${DB_NAME}'...`);
      await adminClient.query(`CREATE DATABASE "${DB_NAME}"`);
      console.log(`Database '${DB_NAME}' created.`);
    } else {
      console.log(`Database '${DB_NAME}' already exists, skipping creation.`);
    }
  } catch (err) {
    console.error('Error during database creation:', err.message || err);
    process.exit(2);
  } finally {
    await adminClient.end();
  }

  // Step 2: Connect to the target db and run schema
  const appClient = new Client({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME
  });

  try {
    await appClient.connect();
    const sql = fs.readFileSync(schemaPath, 'utf8');
    console.log('Running schema from', schemaPath);
    await appClient.query(sql);
    console.log('Database schema ready.');
    process.exit(0);
  } catch (err) {
    console.error('Error running schema:', err.message || err);
    process.exit(2);
  } finally {
    await appClient.end();
  }
}

main();