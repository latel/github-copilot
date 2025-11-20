import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Report } from './report.entity';

@Entity('components')
export class Component {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'report_id' })
  reportId: number;

  @Column({ length: 50 })
  type: string; // 'chart', 'table', 'text', 'image', etc.

  @Column({ type: 'json' })
  properties: any; // JSON Schema based properties

  @Column({ type: 'json', nullable: true })
  position: any; // { x, y, width, height }

  @Column({ type: 'json', nullable: true })
  dataSource: any; // Data configuration

  @Column({ default: 0 })
  zIndex: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Report, (report) => report.components)
  @JoinColumn({ name: 'report_id' })
  report: Report;
}
