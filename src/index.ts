import * as dotenv from "dotenv";
import api from "./infrastructure/entrypoint/api";
import MongoClient from './infrastructure/database/mongo';
import path from "path";

(async function() {  
  MongoClient.connect();
  global.appRoot = path.resolve(__dirname, '..');
  const port = process.env.PORT || 9000;
  api.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
  });
})();