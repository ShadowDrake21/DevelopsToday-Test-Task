import { RandomCountryPipe } from './random-country.pipe';

describe('RandomCountryPipe', () => {
  it('create an instance', () => {
    const pipe = new RandomCountryPipe();
    expect(pipe).toBeTruthy();
  });
});
