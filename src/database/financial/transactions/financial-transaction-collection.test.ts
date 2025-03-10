import { FinancialTransactionCollection } from "./financial-transaction-collection"

describe('FinancialTransactionCollection', () => {
  describe('static', () => {
    it('getFieldNames should return the correct fields when being used for insertion', () => {
      const fieldNames = FinancialTransactionCollection.getFieldNames(true);
      expect(fieldNames).toStrictEqual([
        'date',
        'description',
        'meta',
        'net',
      ]);
    });
    it('getFieldNames should return the correct fields when not being used for insertion', () => {
      const fieldNames = FinancialTransactionCollection.getFieldNames(false);
      expect(fieldNames).toStrictEqual([
        'date',
        'description',
        'meta',
        'net',
        'id',
      ]);
    });
  });
});
