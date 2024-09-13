import { Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CityEntity } from './city.entity';
import { UserEntity } from './user.entity';


@Entity('journeys')
export class JourneysEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => CityEntity, city => city.from, { nullable: true, cascade: true })
  from: CityEntity;
  @OneToOne(() => CityEntity, city => city.to)
  to: CityEntity;
  @ManyToMany(() => UserEntity, user => user.id)
  @JoinTable({name: 'users_journeys'})
  travelers: UserEntity[];
  @OneToOne(() => UserEntity, city => city.id)
  @JoinColumn({name: 'owner_id'})
  owner: UserEntity;
}