import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { TimeSeriesItem } from './domain/time-series-item';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TimeSeriesItemDto } from './dto/time-series-item.dto';
import { PredictRequestDto } from './dto/predict-request.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('predict')
  @ApiTags('Prediction')
  @ApiOkResponse({ type: TimeSeriesItemDto, isArray: true })
  @ApiBody({ type: PredictRequestDto })
  getPrediction(@Body() dto: PredictRequestDto): TimeSeriesItemDto[] {
    try {
      return this.appService
        .getPrediction(
          dto.data.map((i) => new TimeSeriesItem(i.timestamp, i.value)),
          dto.params.window,
          dto.params.forecast,
          dto.params.adjustmentFactor,
        )
        .map((i) => new TimeSeriesItemDto(i.timestamp, i.value));
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }
}
