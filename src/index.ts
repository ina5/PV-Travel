import 'reflect-metadata';
import {createConnection} from 'typeorm';
import { User } from './data-base/entity';

createConnection({
    type: 'mariadb',
    host: 'localhost',
    port: 5005,
    username: 'root',
    password: 'ina',
    database: 'pvtravel',
    entities: [
        __dirname + '/data-base/entity/*.entity.ts',
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
