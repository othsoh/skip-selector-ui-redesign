import axios from 'axios';
import { Skip } from '../types';

const API_BASE_URL = 'https://app.wewantwaste.co.uk/api';

export class SkipService {
  private static instance: SkipService;

  private constructor() {}

  public static getInstance(): SkipService {
    if (!SkipService.instance) {
      SkipService.instance = new SkipService();
    }
    return SkipService.instance;
  }

  async getSkipsByLocation(postcode: string, area: string): Promise<Skip[]> {
    try {
      const response = await axios.get<Skip[]>(`${API_BASE_URL}/skips/by-location`, {
        params: { postcode, area },
        timeout: 10000,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching skips:', error);
      throw new Error('Failed to fetch skip data. Please try again later.');
    }
  }

  calculateTotalPrice(skip: Skip): number {
    const priceWithVat = skip.price_before_vat * (1 + skip.vat / 100);
    return Math.round(priceWithVat * 100) / 100; // Round to 2 decimal places
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(price);
  }
}

export const skipService = SkipService.getInstance();
