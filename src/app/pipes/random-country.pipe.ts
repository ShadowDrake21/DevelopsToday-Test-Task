import { Pipe, PipeTransform } from '@angular/core';
import { ICountry } from '../models/country.interface';

@Pipe({
  name: 'randomCountry',
  standalone: true,
})
export class RandomCountryPipe implements PipeTransform {
  transform(countries: ICountry[]): ICountry {
    const randomIndex = Math.floor(Math.random() * countries.length);
    return countries[randomIndex];
  }
}
