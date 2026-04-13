import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ClassifyService {
  constructor(private readonly httpService: HttpService) {}

  async classifyName(name: string) {
    let genderizeData: any;

    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `https://api.genderize.io/?name=${encodeURIComponent(name)}`,
        ),
      );
      genderizeData = response.data;
    } catch (error) {
      throw new HttpException(
        { status: 'error', message: 'Failed to reach upstream API' },
        HttpStatus.BAD_GATEWAY,
      );
    }

    if (!genderizeData.gender || genderizeData.count === 0) {
      throw new HttpException(
        {
          status: 'error',
          message: 'No prediction available for the provided name',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const gender: string = genderizeData.gender;
    const probability: number = genderizeData.probability;
    const sample_size: number = genderizeData.count;
    const is_confident: boolean = probability >= 0.7 && sample_size >= 100;

    return {
      status: 'success',
      data: {
        name: name.toLowerCase(),
        gender,
        probability,
        sample_size,
        is_confident,
        processed_at: new Date().toISOString(),
      },
    };
  }
}
