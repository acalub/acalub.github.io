import axios from 'axios';

export default class Products {
  constructor() {
   this.endpoint = 'https://www.westelm.com/services/catalog/v4/category/shop/new/all-new/index.json'; 
  }

  async fetch() {
    const { data } = await axios.get(this.endpoint);
    return data;
  }
}
