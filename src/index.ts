import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { User, Role } from './entity';

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
    type: 'mariadb',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'noroots',
    database: 'pvtravel',
    entities: [
        __dirname + '/entity/*.ts',
    ],
    synchronize: true,
    logging: false,
}).then(async connection => {
    // here you can start to work with your entities

    const user = new User();
    user.firstName = 'Pesho';
    user.lastName = 'Balkanski';
    user.username = 'pesh000';
    user.password = 'mnogoslojnaparola';
    user.email = 'pesho@gosho.com';

    const userRepository = connection.getRepository(User);

    await userRepository.save(user);
    console.log('User has been saved!');

    const savedUsers = await userRepository.find();
    console.log('All users from the db: ', savedUsers);
}).catch(error => console.log(error));
