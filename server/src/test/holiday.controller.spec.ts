import { CreateHolidayDTO } from './../dto/create-holiday.dto';
import { HttpStatus } from '@nestjs/common';
import { HolidaysController } from './../controllers/holiday.controller';
import { HolidaysService } from './../services/holiday.service';
import { any } from 'joi';
jest.mock('./../services/holiday.service.ts');

describe('HolidayController', () => {
    it('should call HolidayService findAll method', async () => {
        // Arrange
        const holidayService = new HolidaysService(null, null, null);
        const holidayController = new HolidaysController(holidayService);
        jest.spyOn(holidayService, 'findAll').mockImplementation(() => {
            return HttpStatus.OK;
        });
        // Act
        holidayController.get({});
        // Assert
        expect(holidayService.findAll).toHaveBeenCalledTimes(1);

    });
    it('should call HolidayService findByCriteria method', async () => {
        // Arrange
        const holidayService = new HolidaysService(null, null, null);
        const holidayController = new HolidaysController(holidayService);
        jest.spyOn(holidayService, 'findByCriteria').mockImplementation(() => {
            return HttpStatus.OK;
        });
        // Act
        holidayController.get({ location: 'London' });
        // Assert
        expect(holidayService.findByCriteria).toHaveBeenCalledTimes(1);

    });
    it('should call HolidayService findOne method', async () => {
        // Arrange
        const holidayService = new HolidaysService(null, null, null);
        const holidayController = new HolidaysController(holidayService);
        jest.spyOn(holidayService, 'findOne').mockImplementation(() => {
            return HttpStatus.NOT_FOUND;
        });
        // Act
        holidayController.findOne('id');
        // Assert
        expect(holidayService.findOne).toHaveBeenCalledTimes(1);

    });
    it('should call HolidayService remove method', async () => {
        // Arrange
        const holidayService = new HolidaysService(null, null, null);
        const holidayController = new HolidaysController(holidayService);
        jest.spyOn(holidayService, 'remove').mockImplementation(() => {
            return HttpStatus.NO_CONTENT;
        });
        // Act
        holidayController.remove('id');
        // Assert
        expect(holidayService.remove).toHaveBeenCalledTimes(1);

    });
    it('should call HolidayService update method', async () => {
        // Arrange
        const holidayService = new HolidaysService(null, null, null);
        const holidayController = new HolidaysController(holidayService);
        const holiday = new CreateHolidayDTO();
        jest.spyOn(holidayService, 'update').mockImplementation(() => {
            return HttpStatus.NOT_FOUND;
        });
        // Act
        holidayController.update(holiday, 'id');
        // Assert
        expect(holidayService.update).toHaveBeenCalledTimes(1);

    });

    it('should call HolidayService bookHoliday method', async () => {
        // Arrange
        const holidayService = new HolidaysService(null, null, null);
        const holidayController = new HolidaysController(holidayService);
        jest.spyOn(holidayService, 'bookHoliday');
        // Act
        await holidayController.book({ holidayId: 1 }, { user: { id: 1 } });
        // Assert
        expect(holidayService.bookHoliday).toHaveBeenCalledTimes(1);

    });
});