import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import Header from '../components/Header';
// import getCurrence from '../services/requestAPI';
import { currencyCreator } from '../actions';
import Control from '../components/Control';

class Wallet extends React.Component {
  componentDidMount = async () => {
    const { dispatch } = this.props;
    await currencyCreator(dispatch);
  }

  render() {
    return (
      <>
        <Header />
        <Control />
      </>
    );
  }
}

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
export default connect()(Wallet);
