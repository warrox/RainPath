import { Controller, Get, Post, Body, Param, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { CasesService } from './cases.service';
import { CreateCaseDto } from './dto/create-case.dto';
import { Case } from './interfaces/case.interface';

@Controller('cases')
export class CasesController {
  constructor(private readonly casesService: CasesService) {}

  @Post()
  create(@Body(new ValidationPipe({ transform: true })) createCaseDto: CreateCaseDto): Promise<Case> {
    return this.casesService.create(createCaseDto);
  }

  @Get()
  findAll(): Promise<Case[]> {
    return this.casesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Case> {
    return this.casesService.findOne(id);
  }
}
