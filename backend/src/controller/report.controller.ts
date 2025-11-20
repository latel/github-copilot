import { Controller, Get, Post, Put, Del, Inject, Body, Param, Query } from '@midwayjs/decorator';
import { ReportService } from '../service/report.service';
import { Report } from '../entity/report.entity';

@Controller('/api/reports')
export class ReportController {
  @Inject()
  reportService: ReportService;

  @Post('/')
  async create(@Body() body: Partial<Report>) {
    return await this.reportService.create(body);
  }

  @Get('/')
  async list(@Query('projectId') projectId: number) {
    if (projectId) {
      return await this.reportService.findByProject(projectId);
    }
    return [];
  }

  @Get('/:id')
  async get(@Param('id') id: number) {
    return await this.reportService.findOne(id);
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() body: Partial<Report>) {
    return await this.reportService.update(id, body);
  }

  @Del('/:id')
  async delete(@Param('id') id: number) {
    await this.reportService.delete(id);
    return { success: true };
  }
}
