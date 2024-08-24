import { inject, Inject, Injectable } from '@angular/core';
import { API_URL_TOKEN } from '../constants/tokens.constants';
import { HttpClient } from '@angular/common/http';
import { ICountry } from '../models/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private http = inject(HttpClient);
  constructor(@Inject(API_URL_TOKEN) private apiUrlToken: string) {}

  getAllCountries() {
    return this.http.get<ICountry[]>(`${this.apiUrlToken}/AvailableCountries`);
  }
}
