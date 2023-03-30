import { IsDate, IsInt, Min } from 'class-validator';
import { ValidateProperties } from '../utils/validation/validate-properties.decorator';

@ValidateProperties
export class TimeSeriesItem {
  @IsDate()
  readonly timestamp: Date;

  @IsInt()
  @Min(0)
  readonly value: number;

  constructor(timestamp: Date, value: number) {
    this.timestamp = timestamp;
    this.value = value;
  }
}
