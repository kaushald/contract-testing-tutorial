// src/data.service.ts

import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class DataService {
  private readonly producerUrl = 'http://localhost:8080/api'; // Producer's base URL

  async getGeneralData() {
    const response = await axios.get(`${this.producerUrl}/data`);
    return response.data;
  }

  async getUserById(id: number) {
    const response = await axios.get(`${this.producerUrl}/users/${id}`);
    return response.data;
  }
}
