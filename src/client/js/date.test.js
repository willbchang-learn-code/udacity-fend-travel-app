import {getCountdownDays, isFutureDate} from "./date.js";

it('Should be 278 days from today', () => {
   expect(getCountdownDays('11/22/2020')).toBe(278)
});

it('should be true', function () {
    expect(isFutureDate('11/22/2020')).toBe(true)
});

it('should be false', function () {
    expect(isFutureDate('11/22/2019')).toBe(false)
});

