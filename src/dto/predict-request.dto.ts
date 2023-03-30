import { ApiProperty } from '@nestjs/swagger';
import { TimeSeriesItemDto } from './time-series-item.dto';
import { PropertiesDto } from './properties.dto';
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
    type: PropertiesDto,
    description: 'Prediction model properties',
  })
  @ValidateNested()
  @Type(() => PropertiesDto)
  readonly properties: PropertiesDto;

  constructor(data: TimeSeriesItemDto[], properties: PropertiesDto) {
    this.data = data;
    this.properties = properties;
  }
}
