import { LoggedInUserDTO } from './../dto/loggedInUser-dto';
import { CreateUserDTO } from './../dto/create-user.dto';
import { JwtPayload } from './../interfaces/jwt.interface';
import { UsersService } from './../services/user.service';
import { Repository } from 'typeorm';
import { UserEntity, RoleEntity } from './../data-base/entity';
import * as bcrypt from 'bcrypt';

describe('UserService', () => {
    it('should call bcrypt compare method', async () => {
        // Arrange
        const userRepository: any = new Repository<UserEntity>();
        const roleRepository: any = new Repository<RoleEntity>();
        // Act
        jest.spyOn(bcrypt, 'compare').mockImplementation(() => {
            return true;
        });
        const userFound = jest.spyOn(userRepository, 'findOne').mockImplementation(() => {
            return true;
        });
        const userService = new UsersService(userRepository, roleRepository);
        const loggedInUser = new LoggedInUserDTO();
        await userService.signIn(loggedInUser);
        // Assert
        expect(bcrypt.compare).toHaveBeenCalledTimes(1);
    });
    it('call userService method and check to return true', async () => {
        // Arrange
        const userRepository: any = new Repository<UserEntity>();
        const roleRepository: any = new Repository<RoleEntity>();
        // Act
        jest.spyOn(bcrypt, 'compare').mockImplementation(() => {
            return true;
        });
        const userFound = jest.spyOn(userRepository, 'findOne').mockImplementation(() => {
            return true;
        });
        const userService = new UsersService(userRepository, roleRepository);
        const loggedInUser = new LoggedInUserDTO();
        const sut = await userService.signIn(loggedInUser);
        // Assert
        expect(sut).toBe(true);
    });
    it('should call UserRepository findOne method when call ValidateUser method', async () => {
        // Arrange
        const userRepository: any = new Repository<UserEntity>();
        const roleRepository: any = new Repository<RoleEntity>();

        jest.spyOn(userRepository, 'findOne').mockImplementation(() => {
            return {};
        });
        const userService = new UsersService(userRepository, roleRepository);
        const payload: JwtPayload = {
            username: 'test',
        };
        // Act
        userService.validateUser(payload);
        // Assert
        expect(userRepository.findOne).toHaveBeenCalledTimes(1);
    });
    it('should call UserRepository findOne method when call registerUser method', async () => {
        // Arrange
        const userRepository: any = {
            findOne: () => { },
        };
        const roleRepository: any = {
            findOne: () => { },
        };
        jest.spyOn(userRepository, 'findOne').mockImplementation(() => {
            return {};
        });
        const userService = new UsersService(userRepository, roleRepository);
        const createUserDto = new CreateUserDTO();
        // Act
        userService.registerUser(createUserDto);
        // Assert
        expect(userRepository.findOne).toHaveBeenCalledTimes(1);
    });
    it('should check for Conflict if user exist when call registerUser method', async () => {
        // Arrange
        const userRepository: any = {
            findOne: () => { },
        };
        const roleRepository: any = {
            findOne: () => { },
        };
        // Act
        jest.spyOn(userRepository, 'findOne').mockImplementation(() => {
            return true;
        });
        const userService = new UsersService(userRepository, roleRepository);
        const createUserDto = new CreateUserDTO();
        const userTest = await userRepository.findOne(createUserDto);
        userService.registerUser(createUserDto);
        // Assert
        expect(userTest).toBe(true);
    });
    it('should call find method when we call UserService findAll method', async () => {
        // Arrange
        const userRepository: any = new Repository<UserEntity>();
        const roleRepository: any = new Repository<RoleEntity>();
        // Act
        jest.spyOn(userRepository, 'find').mockImplementation(() => {
            return {};
        });
        const userService = new UsersService(userRepository, roleRepository);
        await userService.findAll();
        // Assert
        expect(userRepository.find).toHaveBeenCalledTimes(1);
    });
    it('should call find method when we call UserService findAll method', async () => {
        // Arrange
        const userRepository: any = new Repository<UserEntity>();
        const roleRepository: any = new Repository<RoleEntity>();
        // Act
        jest.spyOn(userRepository, 'findOne').mockImplementation(() => {
            return {};
        });
        const userService = new UsersService(userRepository, roleRepository);
        await userService.findOne('id');
        // Assert
        expect(userRepository.findOne).toHaveBeenCalledTimes(1);
    });
    it('should call find method when we call UserService findAll method', async () => {
        // Arrange
        const userRepository: any = new Repository<UserEntity>();
        const roleRepository: any = new Repository<RoleEntity>();
        // Act
        jest.spyOn(userRepository, 'find').mockImplementation(() => {
            return {};
        });
        const userService = new UsersService(userRepository, roleRepository);
        await userService.findByCriteria({});
        // Assert
        expect(userRepository.find).toHaveBeenCalledTimes(1);
    });
    it('should call find method when we call UserService findAll method', async () => {
        // Arrange
        const userRepository: any = new Repository<UserEntity>();
        const roleRepository: any = new Repository<RoleEntity>();
        // Act
        jest.spyOn(userRepository, 'findByIds').mockImplementation(() => {
            return {};
        });
        jest.spyOn(userRepository, 'delete').mockImplementation(() => {
            return {};
        });
        const userService = new UsersService(userRepository, roleRepository);
        await userService.remove('id');
        // Assert
        expect(userRepository.findByIds).toHaveBeenCalledTimes(1);
        expect(userRepository.delete).toHaveBeenCalledTimes(1);
    });
    it('should return exception if userRepository can not find User', async () => {
        // Arrange
        const userRepository: any = new Repository<UserEntity>();
        const roleRepository: any = new Repository<RoleEntity>();
        const userService = new UsersService(userRepository, roleRepository);
        let msg = '';

        jest.spyOn(userRepository, 'findOne').mockImplementation(async () => {
            return undefined;
        });

        try {
            await userService.findOne('id');
        } catch (error) {
            msg = error.message.message;

        }
        // Act & Assert
        expect(msg).toBe('This user is not exists!');
    });
    it('should return exception if userRepository can not find User when called findByCriteria UserService', async () => {
        // Arrange
        const userRepository: any = new Repository<UserEntity>();
        const roleRepository: any = new Repository<RoleEntity>();
        const userService = new UsersService(userRepository, roleRepository);
        let msg = '';

        jest.spyOn(userRepository, 'find').mockImplementation(async () => {
            return undefined;
        });

        try {
            await userService.findByCriteria({ id: 'fake' });
        } catch (error) {
            msg = error.message.message;

        }
        // Act & Assert
        expect(msg).toBe('This user is not exists!');
    });
    it('should return exception if userRepository can not find User when called findByCriteria UserService', async () => {
        // Arrange
        const userRepository: any = new Repository<UserEntity>();
        const roleRepository: any = new Repository<RoleEntity>();
        const userService = new UsersService(userRepository, roleRepository);
        let msg = '';

        jest.spyOn(userRepository, 'findByIds').mockImplementation(async () => {
            return false;
        });

        try {
            await userService.remove('id');
        } catch (error) {
            msg = error.message.message;

        }
        // Act & Assert
        expect(msg).toBe('This user is not exists!');
    });
    it('should return exception if userRepository can not find User when called findByCriteria UserService', async () => {
        // Arrange
        const userRepository: any = new Repository<UserEntity>();
        const roleRepository: any = new Repository<RoleEntity>();
        const userService = new UsersService(userRepository, roleRepository);

        jest.spyOn(userRepository, 'findByIds').mockImplementation(async () => {
            return true;
        });
        jest.spyOn(userRepository, 'delete').mockImplementation(async () => {
            return true;
        });
        const sut = await userService.remove('id');
        // Act & Assert
        expect(sut).toBe('Delete successful');
    });
});
