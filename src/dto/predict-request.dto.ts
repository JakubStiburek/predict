import { ApiProperty } from '@nestjs/swagger';
import { TimeSeriesItemDto } from './time-series-item.dto';
import { ParamsDto } from './params.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class PredictRequestDto {
  @ApiProperty({
    type: TimeSeriesItemDto,
    isArray: true,
    description: 'Time series data',
  })
  @ValidateNested({ each: true })
  @Type(() => TimeSeriesItemDto)
  readonly data: TimeSeriesItemDto[];

  @ApiProperty({
    type: ParamsDto,
    description: 'Prediction model parameters',
  })
  @ValidateNested()
  @Type(() => ParamsDto)
  readonly params: ParamsDto;

  constructor(data: TimeSeriesItemDto[], params: ParamsDto) {
    this.data = data;
    this.params = params;
  }
}
