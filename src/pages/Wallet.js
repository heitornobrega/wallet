import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { currencyCreator, expensesCreator, dispatchDeleteExpense } from '../actions';

class Wallet extends React.Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    totalValue: 0,
  }

  componentDidMount = async () => {
    const { dispatch } = this.props;
    await currencyCreator(dispatch);
  }

  handleClick = async (state) => {
    let { id } = this.state;
    const { dispatch } = this.props;
    this.setState({ id: id += 1 });
    await expensesCreator(dispatch, state);
    this.setState({ value: '' });
    this.updateTotalValue();
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  updateTotalValue = () => {
    const { expenses } = this.props;
    const { totalValue } = this.state;
    const currentId = expenses.length - 1;
    const selectedCurrency = expenses[currentId].currency;
    const expenseBRLValue = parseFloat(expenses[currentId].value);
    const actualAsk = parseFloat(expenses[currentId].exchangeRates[selectedCurrency].ask);
    const currentValue = expenseBRLValue * actualAsk;
    this.setState({ totalValue: totalValue + currentValue });
  }

  deleteExpense = (e) => {
    const { dispatch } = this.props;
    const { totalValue } = this.state;
    dispatch(dispatchDeleteExpense(e.target.id));
    console.log(e.target.value);
    this.setState({ totalValue: Number(totalValue) - Number(e.target.value) });
  }

  render() {
    const { currencies, email, expenses } = this.props;
    const { id, value, description, currency, method, tag, totalValue } = this.state;
    return (
      <>
        <header>
          <span data-testid="email-field">
            {email}
          </span>
          <div data-testid="total-field">
            {parseFloat(totalValue).toFixed(2)}
          </div>
          <span data-testid="header-currency-field">
            BRL
          </span>
        </header>
        <form>
          <label
            htmlFor="value-input"
          >
            Valor
            <input
              name="value"
              value={ value }
              id="value-input"
              data-testid="value-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description-input">
            Descrição
            <input
              name="description"
              value={ description }
              id="description-input"
              data-testid="description-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currencies-select">
            Moeda
            <select
              name="currency"
              value={ currency }
              id="currencies-select"
              onChange={ this.handleChange }
            >
              {currencies.map((moeda) => (
                <option
                  value={ moeda }
                  key={ moeda }
                >
                  {moeda}
                </option>))}
            </select>
          </label>
          <label htmlFor="method-input">
            Método de pagamento
            <select
              value={ method }
              name="method"
              id="method-input"
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            Categoria
            <select
              value={ tag }
              name="tag"
              id="tag-input"
              data-testid="tag-input"
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ () => this.handleClick(
              { id, value, description, currency, method, tag },
            ) }
          >
            Adicionar despesa
          </button>
        </form>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length > 0 && (expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{Number(expense.value).toFixed(2)}</td>
                <td>{(expense.exchangeRates[expense.currency].name).split('/')[0]}</td>
                <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
                <td>
                  {(Number(expense.exchangeRates[expense.currency].ask)
                  * Number(expense.value)).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button type="button">Editar</button>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    id={ expense.id }
                    onClick={ this.deleteExpense }
                    value={
                      (Number(expense.exchangeRates[expense.currency].ask)
                    * Number(expense.value))
                    }
                  >
                    Excluir
                  </button>
                </td>
              </tr>)))}
          </tbody>
        </table>
      </>
    );
  }
}
Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
  email: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Wallet);
