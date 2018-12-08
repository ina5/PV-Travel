"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_user_dto_1 = require("./dto/create-user.dto");
const user_service_1 = require("./user.service");
const common_1 = require("@nestjs/common");
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    create(createUserDTO) {
        if (Object.keys(createUserDTO).length === 0) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FORBIDDEN,
                error: 'User is not valid',
            }, 403);
        }
        this.userService.create(createUserDTO);
        return 'User was created!';
    }
    findAll() {
        if (this.userService) {
            return this.userService.findAll();
        }
        return common_1.HttpStatus.NOT_FOUND;
    }
    findOne(id) {
        return this.userService.findOne(id);
    }
    remove(id) {
        return this.userService.remove(id);
    }
};
__decorate([
    common_1.HttpCode(201),
    common_1.Post('register'),
    __param(0, common_1.Body(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDTO]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "create", null);
__decorate([
    common_1.HttpCode(200),
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    common_1.HttpCode(200),
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    common_1.HttpCode(200),
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
UsersController = __decorate([
    common_1.Controller('users'),
    __metadata("design:paramtypes", [user_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=user.controller.js.map