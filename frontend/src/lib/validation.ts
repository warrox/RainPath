import { CreateSampleDto } from '../types/case';

export function validateSamples(samples: CreateSampleDto[]): string | null {
  const hasEmptyColorations = samples.some(sample =>
    sample.blocks.some(block =>
      block.slides.some(slide => !slide.coloration.trim())
    )
  );

  if (hasEmptyColorations) {
    return 'Please fill in all coloration fields';
  }

  return null;
}
