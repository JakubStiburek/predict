import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class ParamsDto {
  @ApiProperty({ description: 'Moving average window size' })
  @IsInt()
  @Min(1)
  readonly window: number;

  @ApiPropertyOptional({
    description: 'Number of future values to predict, defaults to 5',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  readonly forecast?: number;

  @ApiPropertyOptional({ description: 'Adjustment factor, defaults to 1' })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  readonly adjustmentFactor?: number;

  constructor(window: number, forecast?: number, adjustmentFactor?: number) {
    this.window = window;
    this.forecast = forecast;
    this.adjustmentFactor = adjustmentFactor;
  }
}
