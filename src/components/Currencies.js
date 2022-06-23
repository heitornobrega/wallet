import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Currencies extends Component {
  render() {
    const { currencies } = this.props;
    return (
      <label htmlFor="currencies-select">
        Moeda
        <select name="currencies-select" id="currencies-select">
          {currencies.map((currency) => <option key={ currency }>{currency}</option>)}
        </select>
      </label>
    );
  }
}

Currencies.propTypes = {
  currencies: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({ currencies: state.wallet.currencies });
export default connect(mapStateToProps)(Currencies);
