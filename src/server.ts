import app from "./app";
import { testDbConnection } from "./app/utils/testDb";
const PORT=5000;


async function main(){
    try{

      await testDbConnection();
      app.listen(PORT,()=>{
        console.log(`server running on port ${PORT}`);
      })
    }catch(error){
        console.log(error);
    }
}

main();