import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from '../entity/report.entity';

@Provide()
export class ReportService {
  @InjectEntityModel(Report)
  reportRepository: Repository<Report>;

  async create(data: Partial<Report>): Promise<Report> {
    const report = this.reportRepository.create(data);
    return await this.reportRepository.save(report);
  }

  async findByProject(projectId: number): Promise<Report[]> {
    return await this.reportRepository.find({
      where: { projectId, isActive: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Report> {
    return await this.reportRepository.findOne({
      where: { id },
      relations: ['components'],
    });
  }

  async update(id: number, data: Partial<Report>): Promise<Report> {
    await this.reportRepository.update(id, data);
    return await this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.reportRepository.update(id, { isActive: false });
  }
}
