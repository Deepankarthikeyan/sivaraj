import sql from 'mssql';
import dotenv from 'dotenv';
dotenv.config({ path: new URL('./.env', import.meta.url) });

const config = {
    port: Number(process.env.DB_PORT || 46641),
     server: `${process.env.SERVERNAME}`, // Your SQL Server name or IP
    database: 'SVSM_IT', // Your database name
    options: {
        encrypt: false, // Adjust based on your SSL settings
        trustServerCertificate: true, // Allow self-signed certificate
    },
    authentication: {
        type: 'default',
        options: {
            userName: 'sa', // Replace with the login name you created
            password: process.env.DB_PASSWORD,
        },
    },
    requestTimeout: 1000000, // Set timeout to 30 seconds
    connectionTimeout: 1000000, // Set connection timeout to 30 second
    
};

let poolPromise;
export const getPool = async () => {
  if (!process.env.SERVERNAME) throw new Error('Set SERVERNAME in Backend/.env to your SQL Server hostname or IP');
  if (!poolPromise) {
    poolPromise = sql.connect(config).catch(err => {
      poolPromise = null;
      throw err;
    });
  }
  return poolPromise;
};

export { sql };
