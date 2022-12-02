import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Max, Min } from 'class-validator';

export class ValidateOpitionsDto {
  @IsInt()
  @Min(7)
  @Max(9)
  @ApiProperty({
    description: 'Integer betwee 7 and 9 to indicate the question',
    example: 8,
  })
  questionNumber: number;
}
