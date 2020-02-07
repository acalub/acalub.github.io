import axios from 'axios';
import { ENDPOINT } from '@/lib/types';
export default class Products {
  constructor() {
  }
  async fetch() {
    const { data } = await axios.get(ENDPOINT);
    return data;
  }
}
