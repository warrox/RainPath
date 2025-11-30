import { CreateSlideDto, CreateBlockDto, CreateSampleDto } from '../types/case';

export const EMPTY_SLIDE: CreateSlideDto = {
  coloration: ''
};

export const EMPTY_BLOCK: CreateBlockDto = {
  slides: [{ ...EMPTY_SLIDE }]
};

export const EMPTY_SAMPLE: CreateSampleDto = {
  blocks: [{ ...EMPTY_BLOCK }]
};
