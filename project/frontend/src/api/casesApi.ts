import { Case, CreateCaseDto } from '../types/case';

const API_BASE_URL = 'http://localhost:3000';

export const casesApi = {
  async getAll(): Promise<Case[]> {
    const response = await fetch(`${API_BASE_URL}/cases`);
    if (!response.ok) {
      throw new Error('Failed to fetch cases');
    }
    return response.json();
  },

  async getById(id: number): Promise<Case> {
    const response = await fetch(`${API_BASE_URL}/cases/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch case ${id}`);
    }
    return response.json();
  },

  async create(data: CreateCaseDto): Promise<Case> {
    const response = await fetch(`${API_BASE_URL}/cases`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create case');
    }
    return response.json();
  },
};
