import { useState } from 'react';
import { CreateSampleDto } from '../types/case';
import { EMPTY_SAMPLE, EMPTY_SLIDE } from '../lib/form-constants';

interface UseSamplesResult {
  samples: CreateSampleDto[];
  addSample: () => void;
  removeSample: (sampleIndex: number) => void;
  addBlock: (sampleIndex: number) => void;
  removeBlock: (sampleIndex: number, blockIndex: number) => void;
  addSlide: (sampleIndex: number, blockIndex: number) => void;
  removeSlide: (sampleIndex: number, blockIndex: number, slideIndex: number) => void;
  updateColoration: (sampleIndex: number, blockIndex: number, slideIndex: number, value: string) => void;
}

export function useSamples(initialSamples: CreateSampleDto[] = [{ ...EMPTY_SAMPLE }]): UseSamplesResult {
  const [samples, setSamples] = useState<CreateSampleDto[]>(initialSamples);

  const addSample = () => {
    setSamples([...samples, { blocks: [{ slides: [{ ...EMPTY_SLIDE }] }] }]);
  };

  const removeSample = (sampleIndex: number) => {
    setSamples(samples.filter((_, i) => i !== sampleIndex));
  };

  const addBlock = (sampleIndex: number) => {
    const newSamples = [...samples];
    newSamples[sampleIndex].blocks.push({ slides: [{ ...EMPTY_SLIDE }] });
    setSamples(newSamples);
  };

  const removeBlock = (sampleIndex: number, blockIndex: number) => {
    const newSamples = [...samples];
    newSamples[sampleIndex].blocks = newSamples[sampleIndex].blocks.filter((_, i) => i !== blockIndex);
    setSamples(newSamples);
  };

  const addSlide = (sampleIndex: number, blockIndex: number) => {
    const newSamples = [...samples];
    newSamples[sampleIndex].blocks[blockIndex].slides.push({ ...EMPTY_SLIDE });
    setSamples(newSamples);
  };

  const removeSlide = (sampleIndex: number, blockIndex: number, slideIndex: number) => {
    const newSamples = [...samples];
    newSamples[sampleIndex].blocks[blockIndex].slides = 
      newSamples[sampleIndex].blocks[blockIndex].slides.filter((_, i) => i !== slideIndex);
    setSamples(newSamples);
  };

  const updateColoration = (sampleIndex: number, blockIndex: number, slideIndex: number, value: string) => {
    const newSamples = [...samples];
    newSamples[sampleIndex].blocks[blockIndex].slides[slideIndex].coloration = value;
    setSamples(newSamples);
  };

  return {
    samples,
    addSample,
    removeSample,
    addBlock,
    removeBlock,
    addSlide,
    removeSlide,
    updateColoration,
  };
}
