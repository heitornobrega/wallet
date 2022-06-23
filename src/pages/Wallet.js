import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { currencyCreator, expensesCreator } from '../actions';

class Wallet extends React.Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: '',
    tag: '',
    // exchangeRates: {},
    // id: '',
  }

  componentDidMount = async () => {
    const { dispatch } = this.props;
    await currencyCreator(dispatch);
  }

  // handleClick = () => {
  //   console.log('oi');
  // }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { currencies, email, dispatch } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <>
        <header>
          <span data-testid="email-field">
            {email}
          </span>
          <span data-testid="total-field">
            0
          </span>
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
              <option value="dinheiro">Dinheiro</option>
              <option value="crédito">Cartão de crédito</option>
              <option value="débito">Cartão de débito</option>
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
              <option value="alimentacao">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saude">Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ () => dispatch(expensesCreator([this.state])) }
          >
            Adicionar despesa
          </button>
        </form>
      </>
    );
  }
}

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  email: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
