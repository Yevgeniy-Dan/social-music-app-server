import { Controller, Get, Query, Res } from '@nestjs/common';
import { ActivationService } from '../activation.service';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { Configuration } from 'configuration.interface';

@Controller('activate')
export class ActivationController {
  constructor(
    private readonly activationSerivce: ActivationService,
    private configService: ConfigService<Configuration>
  ) {}
  @Get()
  async activate(@Query('token') token: string, @Res() response: Response) {
    try {
      await this.activationSerivce.activate(token);
      return response.redirect(this.configService.get('clientOrigin'));
    } catch (error) {
      console.log(error);
    }
  }
}
