import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '../prisma/prisma.service';
import { CreateCaseDto } from './dto/create-case.dto';
import { Case } from './interfaces/case.interface';

@Injectable()
export class CasesService {
  constructor() { }

  async create(createCaseDto: CreateCaseDto): Promise<Case> {
    const caseData = await prisma.case.create({
      data: {
        samples: {
          create: createCaseDto.samples.map(sample => ({
            blocks: {
              create: sample.blocks.map(block => ({
                slides: {
                  create: block.slides.map(slide => ({
                    coloration: slide.coloration,
                  })),
                },
              })),
            },
          })),
        },
      },
      include: {
        samples: {
          include: {
            blocks: {
              include: {
                slides: true,
              },
            },
          },
        },
      },
    });

    return caseData as Case;
  }

  async findAll(): Promise<Case[]> {
    const cases = await prisma.case.findMany({
      include: {
        samples: {
          include: {
            blocks: {
              include: {
                slides: true,
              },
            },
          },
        },
      },
    });

    return cases as Case[];
  }

  async findOne(id: number): Promise<Case> {
    const caseData = await prisma.case.findUnique({
      where: { id },
      include: {
        samples: {
          include: {
            blocks: {
              include: {
                slides: true,
              },
            },
          },
        },
      },
    });

    if (!caseData) {
      throw new NotFoundException(`Case with ID ${id} not found`);
    }

    return caseData as Case;
  }
}
