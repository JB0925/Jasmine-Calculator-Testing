describe('running with values that do not throw errors', () => {
  it('should calculate the monthly rate correctly', function () {
    expect(calculateMonthlyPayment({amount: 0, years: 0, rate:0})).toEqual('0.00');
    expect(calculateMonthlyPayment({amount: 30000, years: 5, rate: .04})).toEqual('552.49');
    expect(calculateMonthlyPayment({amount: 42317, years: 10, rate: .04})).toEqual('428.43');
    expect(calculateMonthlyPayment({amount: 1, years: 5, rate: .043216})).toEqual('0.01');
  });
});

describe('check to make sure there are two decimal places', () => {
  it("should return a result with 2 decimal places", function() {
    expect(calculateMonthlyPayment({amount: 0, years: 0, rate:0}).split('.')[1].length).toEqual(2);
    expect(calculateMonthlyPayment({amount: 30000, years: 5, rate: .04}).split('.')[1].length).toEqual(2);
    expect(calculateMonthlyPayment({amount: 42317, years: 10, rate: .04}).split('.')[1].length).toEqual(2);
    expect(calculateMonthlyPayment({amount: 999999, years: 543210, rate: .043216}).split('.')[1].length).toEqual(2);
    expect(calculateMonthlyPayment({amount: 1, years: 5, rate: .04}).split('.')[1].length).toEqual(2);
  });
});

describe('check to ensure errors are thrown with negative values', function() {
  it('should throw an error when given negative values', function() {
    expect(() => {calculateMonthlyPayment({amount: 30000, years: -5, rate: .04})})
    .toThrowError('one of your values is less than zero, which does not make sense.');
    expect(() => {calculateMonthlyPayment({amount: -30000, years: -5, rate: .04})})
    .toThrowError('one of your values is less than zero, which does not make sense.');
    expect(() => {calculateMonthlyPayment({amount: 30000, years: 5, rate: -.04})})
    .toThrowError('one of your values is less than zero, which does not make sense.');
  });
});




