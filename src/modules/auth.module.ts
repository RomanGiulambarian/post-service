import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { AuthController } from '../auth/auth.controller';
import { UserModule } from 'src/modules/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from '../common/strategies/accessToken.strategy';
import { RefreshTokenStrategy } from '../common/strategies/refreshToken.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [UserModule, JwtModule.register({}), PassportModule],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
  exports: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
