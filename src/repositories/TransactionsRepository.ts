import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomes = this.transactions.map((transaction): number => {
      if (transaction.type === 'income') {
        return transaction.value;
      }
      return 0;
    });
    const somaIncomes = incomes.reduce(
      (total: number, values: number): number => total + values,
      0,
    );

    const outcomes = this.transactions.map((transaction): number => {
      if (transaction.type === 'outcome') {
        return transaction.value;
      }
      return 0;
    });

    const somaOutcomes = outcomes.reduce(
      (total: number, values: number): number => total + values,
      0,
    );

    const balance = {
      income: somaIncomes,
      outcome: somaOutcomes,
      total: somaIncomes - somaOutcomes,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
