import "reflect-metadata";
import { createConnection } from "typeorm";


// createConnection().then(async connection => {


    // default
    // console.log("Inserting a new user into the database...");
    // const user = new User();
    // user.firstName = "Timber";
    // user.lastName = "Saw";
    // await connection.manager.save(user);
    // console.log("Saved a new user with id: " + user.id);

    // console.log("Loading users from the database...");
    // const users = await connection.manager.find(User);
    // console.log("Loaded users: ", users);

    // console.log("Here you can setup and run express/koa/any other framework.");

// }).catch(error => console.log(error));

createConnection({
    type: "mariadb",
    host: "localhost",
    port: 5005,
    username: "root",
    password: "ina",
    database: "pvtravel",
    entities: [
        __dirname + "/entity/*.ts"
    ],
    synchronize: true,
    logging: false
}).then(connection => {
    // here you can start to work with your entities
}).catch(error => console.log(error));