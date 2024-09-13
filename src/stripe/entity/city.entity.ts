import { Column, Entity, OneToOne, Point, PrimaryGeneratedColumn } from 'typeorm';
import { JourneysEntity } from './journeys.entity';

@Entity('cities')
export class CityEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 50 })
  location: string;
  @Column({ type: "point", nullable: false })
  coordinate: Point;
  @OneToOne(() => JourneysEntity, journey => journey.from)
  from: JourneysEntity;
  @OneToOne(() => JourneysEntity, journey => journey.to)
  to: JourneysEntity;
}