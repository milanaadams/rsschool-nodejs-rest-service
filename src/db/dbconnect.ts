import { getConnection, createConnection } from 'typeorm';
import { config } from '../common/ormconfig';

const connectToDB = async () => {
  let connection;

  try {
    connection = await getConnection();
  } catch(err) {
    // handle later
  }

  try {
    if(connection) {
      if (!connection.isConnected) {
        await connection.connect();
      }
    } else {
      createConnection(config);
    }
    console.log('Successfully Connected to DB')
  } catch(err) {
    console.error('DB connection error', err);
  }
}

export const tryDBConnect = async (cb: CallableFunction): Promise<void> => {
  try {
    connectToDB();
    cb();
  } catch(err) {
    console.error('DB connection error', err)
  }
}
