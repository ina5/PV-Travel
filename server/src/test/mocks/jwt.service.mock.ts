import { JwtService } from '@nestjs/jwt';
export class JwtServiceMock extends JwtService {
    sign(payload: any, options?: any): string {
        return 'token';
    }
}
