import { Controller, Get, Post, Put, Del, Inject, Body, Param, Query } from '@midwayjs/decorator';
import { ComponentService } from '../service/component.service';
import { Component } from '../entity/component.entity';

@Controller('/api/components')
export class ComponentController {
  @Inject()
  componentService: ComponentService;

  @Post('/')
  async create(@Body() body: Partial<Component>) {
    return await this.componentService.create(body);
  }

  @Get('/')
  async list(@Query('reportId') reportId: number) {
    if (reportId) {
      return await this.componentService.findByReport(reportId);
    }
    return [];
  }

  @Get('/:id')
  async get(@Param('id') id: number) {
    return await this.componentService.findOne(id);
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() body: Partial<Component>) {
    return await this.componentService.update(id, body);
  }

  @Post('/batch')
  async batchUpdate(@Body() body: { components: Partial<Component>[] }) {
    await this.componentService.batchUpdate(body.components);
    return { success: true };
  }

  @Del('/:id')
  async delete(@Param('id') id: number) {
    await this.componentService.delete(id);
    return { success: true };
  }
}
