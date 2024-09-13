import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JourneysEntity } from '../entity/journeys.entity';

export default class JourneysRepository extends Repository<JourneysEntity> {
  constructor(@InjectRepository(JourneysEntity) journeysRepository: Repository<JourneysEntity>) {
    super(journeysRepository.target, journeysRepository.manager, journeysRepository.queryRunner);
  }
  getWithRelations() {
    return this.createQueryBuilder('journeys')
      .leftJoin('journeys.travelers', 'travelers')
      .getMany();
  }
}