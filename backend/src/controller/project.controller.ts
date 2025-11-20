import { Controller, Get, Post, Put, Del, Inject, Body, Param } from '@midwayjs/decorator';
import { ProjectService } from '../service/project.service';
import { Project } from '../entity/project.entity';

@Controller('/api/projects')
export class ProjectController {
  @Inject()
  projectService: ProjectService;

  @Post('/')
  async create(@Body() body: Partial<Project>) {
    return await this.projectService.create(body);
  }

  @Get('/')
  async list() {
    return await this.projectService.findAll();
  }

  @Get('/:id')
  async get(@Param('id') id: number) {
    return await this.projectService.findOne(id);
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() body: Partial<Project>) {
    return await this.projectService.update(id, body);
  }

  @Del('/:id')
  async delete(@Param('id') id: number) {
    await this.projectService.delete(id);
    return { success: true };
  }
}
