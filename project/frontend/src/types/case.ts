export interface Slide {
  id: number;
  coloration: string;
  createdAt: string;
  updatedAt: string;
}

export interface Block {
  id: number;
  slides: Slide[];
  createdAt: string;
  updatedAt: string;
}

export interface Sample {
  id: number;
  blocks: Block[];
  createdAt: string;
  updatedAt: string;
}

export interface Case {
  id: number;
  samples: Sample[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateSlideDto {
  coloration: string;
}

export interface CreateBlockDto {
  slides: CreateSlideDto[];
}

export interface CreateSampleDto {
  blocks: CreateBlockDto[];
}

export interface CreateCaseDto {
  samples: CreateSampleDto[];
}
