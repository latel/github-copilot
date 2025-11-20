import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { Component } from '../entity/component.entity';

@Provide()
export class ComponentService {
  @InjectEntityModel(Component)
  componentRepository: Repository<Component>;

  async create(data: Partial<Component>): Promise<Component> {
    const component = this.componentRepository.create(data);
    return await this.componentRepository.save(component);
  }

  async findByReport(reportId: number): Promise<Component[]> {
    return await this.componentRepository.find({
      where: { reportId },
      order: { zIndex: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Component> {
    return await this.componentRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, data: Partial<Component>): Promise<Component> {
    await this.componentRepository.update(id, data);
    return await this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.componentRepository.delete(id);
  }

  async batchUpdate(components: Partial<Component>[]): Promise<void> {
    for (const comp of components) {
      if (comp.id) {
        await this.componentRepository.update(comp.id, comp);
      }
    }
  }
}
