import { HttpStatus } from '@nestjs/common';
import { UsersService } from './../services/user.service';
import { UsersController } from './../controllers/user.controller';

jest.mock('./../services/user.service.ts');

describe('UserController', () => {
  it('should call UsersService findAll method', async () => {
    // Arrange
    const userService = new UsersService(null, null);
    const userController = new UsersController(userService);
    jest.spyOn(userService, 'findAll').mockImplementation(() => {
      return HttpStatus.OK;
    });
    // Act
    userController.get({});
    // Assert
    expect(userService.findAll).toHaveBeenCalledTimes(1);
  });

  it('should call UsersService findByCriteria method', async () => {
    // Arrange
    const userService = new UsersService(null, null);
    const userController = new UsersController(userService);
    jest.spyOn(userService, 'findByCriteria').mockImplementation(() => {
      return HttpStatus.OK;
    });
    // Act
    userController.get({ username: 'pesho' });
    // Assert
    expect(userService.findByCriteria).toHaveBeenCalledTimes(1);
  });

  it('should call UsersService findOne method', async () => {
    // Arrange
    const userService = new UsersService(null, null);
    const userController = new UsersController(userService);
    jest.spyOn(userService, 'findOne').mockImplementation(() => {
      return HttpStatus.NOT_FOUND;
    });
    // Act
    userController.findOne(999);
    // Assert
    expect(userService.findOne).toHaveBeenCalledTimes(1);
  });

  it('should call UsersService remove method', async () => {
    // Arrange
    const userService = new UsersService(null, null);
    const userController = new UsersController(userService);
    jest.spyOn(userService, 'remove').mockImplementation(() => {
      return HttpStatus.NO_CONTENT;
    });
    // Act
    userController.remove('pesho');
    // Assert
    expect(userService.remove).toHaveBeenCalledTimes(1);
  });
});
