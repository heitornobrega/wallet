import React, { Component } from 'react';
import Currencies from './Currencies';

class Control extends Component {
  render() {
    return (
      <form>
        <label htmlFor="value-input">
          Valor
          <input
            id="value-input"
            data-testid="value-input"
          />
        </label>
        <label htmlFor="description-input">
          Descrição
          <input
            id="description-input"
            data-testid="description-input"
          />
        </label>
        <Currencies />
        <label htmlFor="method-input">
          Método de pagamento
          <select name="method-input" id="method-input" data-testid="method-input">
            <option value="dinheiro">Dinheiro</option>
            <option value="crédito">Cartão de crédito</option>
            <option value="débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Categoria
          <select name="tag-input" id="tag-input" data-testid="tag-input">
            <option value="dinheiro">Alimentação</option>
            <option value="crédito">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

export default Control;
