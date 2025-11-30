export interface Slide {
  id: number;
  coloration: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Block {
  id: number;
  slides: Slide[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Sample {
  id: number;
  blocks: Block[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Case {
  id: number;
  samples: Sample[];
  createdAt: Date;
  updatedAt: Date;
}
