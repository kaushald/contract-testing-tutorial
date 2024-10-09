import { Controller, Get, Param } from '@nestjs/common';
import { DataService } from './data.service';

@Controller('consumer')
export class AppController {
  constructor(private readonly dataService: DataService) {}

  @Get('data')
  async getGeneralData() {
    return await this.dataService.getGeneralData();
  }

  @Get('user/:id')
  async getUserById(@Param('id') id: number) {
    return await this.dataService.getUserById(id);
  }
}
