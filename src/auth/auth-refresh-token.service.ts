import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from 'src/users/entities/token.entity';

@Injectable()
export class AuthRefreshTokenService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Token) private readonly tokenRepository: Repository<Token>
  ) {}

  generateToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload, { expiresIn: '7d' });
  }

  async saveToken(userId: string, refreshToken: string): Promise<Token> {
    const tokenData = await this.tokenRepository.findOneBy({ userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return await this.tokenRepository.save(tokenData);
    }

    const token = this.tokenRepository.create({
      userId,
      refreshToken,
    });

    return await this.tokenRepository.save(token);
  }

  async remove(refreshToken: string) {
    const token = await this.tokenRepository.findOneBy({ refreshToken });
    const removedToken = await this.tokenRepository.remove(token);
    return removedToken;
  }

  async find(refreshToken: string) {
    const token = await this.tokenRepository.findOneBy({ refreshToken });
    return token?.refreshToken;
  }
}
