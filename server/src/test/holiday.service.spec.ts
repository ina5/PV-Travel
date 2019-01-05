import { CreateHolidayDTO } from './../dto/create-holiday.dto';
import { HolidaysService } from './../services/holiday.service';
import { LocationEntity } from './../data-base/entity/location.entity';
import { UserEntity, HolidayEntity } from 'src/data-base/entity';
import { Repository } from 'typeorm';
describe('HolidayService', () => {
  it('should call findOne method when create method is called', async () => {
    // Arrange
    const userRepository: any = new Repository<UserEntity>();
    const holidayRepository: any = new Repository<HolidayEntity>();
    const locationRepository: any = new Repository<LocationEntity>();
    const holidayDTO = new CreateHolidayDTO();

    jest.spyOn(holidayRepository, 'findOne').mockImplementation(() => {
      return false;
    });
    jest.spyOn(locationRepository, 'findOne').mockImplementation(() => {
      return true;
    });
    jest.spyOn(holidayRepository, 'create').mockImplementation(() => {
      return true;
    });
    jest.spyOn(holidayRepository, 'save').mockImplementation(() => {
      return true;
    });

    const holidayService: any = new HolidaysService(holidayRepository, locationRepository, userRepository);

    jest.spyOn(holidayService, 'checkForLocation').mockImplementation(() => {
      return 'success';
    });
    // Act
    await holidayService.create(holidayDTO);
    // Assert
    expect(holidayRepository.findOne).toHaveBeenCalledTimes(1);
  });

  it('should throw when create method is called', async () => {
    // Arrange
    const userRepository: any = new Repository<UserEntity>();
    const holidayRepository: any = new Repository<HolidayEntity>();
    const locationRepository: any = new Repository<LocationEntity>();
    const holidayDTO = new CreateHolidayDTO();
    let msg = '';

    jest.spyOn(holidayRepository, 'findOne').mockImplementation(() => {
      return true;
    });
    jest.spyOn(locationRepository, 'findOne').mockImplementation(() => {
      return true;
    });
    jest.spyOn(holidayRepository, 'create').mockImplementation(() => {
      return true;
    });
    jest.spyOn(holidayRepository, 'save').mockImplementation(() => {
      return true;
    });

    const holidayService: any = new HolidaysService(holidayRepository, locationRepository, userRepository);

    jest.spyOn(holidayService, 'checkForLocation').mockImplementation(() => {
      return 'success';
    });
    // Act
    try {
      await holidayService.create(holidayDTO);
    } catch (error) {
      msg = error.message.message;
    }
    // Assert
    expect(msg).toBe('This holiday already exists!');
  });

  it('should call find method once when findAll method is called', async () => {
    // Arrange
    const userRepository: any = new Repository<UserEntity>();
    const holidayRepository: any = new Repository<HolidayEntity>();
    const locationRepository: any = new Repository<LocationEntity>();

    const holidayService = new HolidaysService(holidayRepository, locationRepository, userRepository);

    jest.spyOn(holidayRepository, 'find').mockImplementation(() => {
      return true;
    });

    // Act
    holidayService.findAll();
    // Assert
    expect(holidayRepository.find).toHaveBeenCalledTimes(1);
  });

  it('should call holidayRepository findOne method once when holidayService findOne method is called', async () => {
    // Arrange
    const userRepository: any = new Repository<UserEntity>();
    const holidayRepository: any = new Repository<HolidayEntity>();
    const locationRepository: any = new Repository<LocationEntity>();

    const holidayService = new HolidaysService(holidayRepository, locationRepository, userRepository);

    jest.spyOn(holidayRepository, 'findOne').mockImplementation(() => {
      return true;
    });

    // Act
    holidayService.findOne('id');
    // Assert
    expect(holidayRepository.findOne).toHaveBeenCalledTimes(1);
  });

  it('should call holidayRepository findByIds method once when holidayService remove method is called', async () => {
    // Arrange
    const userRepository: any = new Repository<UserEntity>();
    const holidayRepository: any = new Repository<HolidayEntity>();
    const locationRepository: any = new Repository<LocationEntity>();

    const holidayService = new HolidaysService(holidayRepository, locationRepository, userRepository);

    jest.spyOn(holidayRepository, 'findByIds').mockImplementation(() => {
      return true;
    });

    // Act
    holidayService.remove('id');
    // Assert
    expect(holidayRepository.findByIds).toHaveBeenCalledTimes(1);
  });

  it('should throw when holidayService remove method is called', async () => {
    // Arrange
    const userRepository: any = new Repository<UserEntity>();
    const holidayRepository: any = new Repository<HolidayEntity>();
    const locationRepository: any = new Repository<LocationEntity>();
    let msg = '';

    const holidayService = new HolidaysService(holidayRepository, locationRepository, userRepository);

    jest.spyOn(holidayRepository, 'findByIds').mockImplementation(() => {
      return false;
    });

    // Act
    try {
      await holidayService.remove('id');
    } catch (error) {
      msg = error.message.message;
    }
    // Assert
    expect(msg).toBe('This holiday does not exist!');
  });

  it('should call holidayRepository delete method once when holidayService remove method is called', async () => {
    // Arrange
    const userRepository: any = new Repository<UserEntity>();
    const holidayRepository: any = new Repository<HolidayEntity>();
    const locationRepository: any = new Repository<LocationEntity>();
    let msg = '';

    const holidayService = new HolidaysService(holidayRepository, locationRepository, userRepository);

    jest.spyOn(holidayRepository, 'findByIds').mockImplementation(() => {
      return true;
    });

    jest.spyOn(holidayRepository, 'delete').mockImplementation(() => {
      return true;
    });

    // Act
    try {
      await holidayService.remove('id');
    } catch (error) {
      msg = error.message.message;
    }
    // Assert
    expect(holidayRepository.delete).toHaveBeenCalledTimes(1);
  });

  it('holidayRepository delete method should return when holidayService remove method is called', async () => {
    // Arrange
    const userRepository: any = new Repository<UserEntity>();
    const holidayRepository: any = new Repository<HolidayEntity>();
    const locationRepository: any = new Repository<LocationEntity>();
    let msg = '';

    const holidayService = new HolidaysService(holidayRepository, locationRepository, userRepository);

    jest.spyOn(holidayRepository, 'findByIds').mockImplementation(() => {
      return true;
    });

    jest.spyOn(holidayRepository, 'delete').mockImplementation(() => {
      return true;
    });

    // Act
    try {
      await holidayService.remove('id');
    } catch (error) {
      msg = error.message.message;
    }
    // Assert
    expect(holidayRepository.delete).toReturn();
  });
});
