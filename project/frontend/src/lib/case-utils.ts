import { Case } from '../types/case';

export function calculateCaseStats(caseData: Case) {
  const specimenCount = caseData.samples.length;
  const blockCount = caseData.samples.reduce((sum, s) => sum + s.blocks.length, 0);
  const slideCount = caseData.samples.reduce(
    (sum, s) => sum + s.blocks.reduce((bSum, b) => bSum + b.slides.length, 0),
    0
  );

  return { specimenCount, blockCount, slideCount };
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString();
}

export function formatDateTime(date: Date | string): string {
  return new Date(date).toLocaleString();
}

export function getBlockLabel(index: number): string {
  return String.fromCharCode(65 + index);
}
