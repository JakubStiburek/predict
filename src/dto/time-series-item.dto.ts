import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class TimeSeriesItemDto {
  @ApiProperty()
  @Type(() => Date)
  readonly timestamp: Date;

  @ApiProperty()
  @IsInt()
  @Min(0)
  readonly value: number;

  constructor(timestamp: Date, value: number) {
    this.timestamp = timestamp;
    this.value = value;
  }
}
