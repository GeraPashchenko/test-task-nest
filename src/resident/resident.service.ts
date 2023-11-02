import { Injectable } from '@nestjs/common';
import { ResidentRepository } from './resident.repository';
import {
  ICityPopulationCount,
  IResidentsData,
} from './interfaces/residents-data.interface';

@Injectable()
export class ResidentService {
  constructor(private readonly residentRepository: ResidentRepository) {}

  async getResidentsData(
    city: string,
    skip: number,
    take: number,
  ): Promise<IResidentsData> {
    const cityMembersMapped = [];

    const cityPopulationCount: ICityPopulationCount[] =
      await this.residentRepository.getCitiesPopulation(city, skip, take);

    for (const mappedCity of cityPopulationCount) {
      const members = await this.residentRepository.countMembersWithSameName(
        mappedCity.city,
      );

      cityMembersMapped.push({
        city: mappedCity,
        members,
      });
    }

    return {
      cities_population: cityPopulationCount,
      city_members: cityMembersMapped,
    };
  }
}
