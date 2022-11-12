import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { timerOutFalse, timerOutTrue, timerUpdate } from '../redux/actions';

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      secondsLeft: '',
    };
  }

  componentDidMount() {
    const { time, dispatch } = this.props;
    dispatch(timerOutFalse());
    this.setState({ secondsLeft: time });
    const tickTimerMS = 1000;
    this.timerID = setInterval(
      () => this.tick(),
      tickTimerMS,
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick = () => {
    const { dispatch } = this.props;
    const { secondsLeft } = this.state;

    if (secondsLeft > 0) {
      this.setState((prevState) => ({
        secondsLeft: prevState.secondsLeft - 1,
      }));
    }
    dispatch(timerUpdate(secondsLeft - 1));
    if (secondsLeft === 0) {
      console.log('Seu tempo acabou');
      clearInterval(this.timerID);
      dispatch(timerOutTrue());
    }
  };

  render() {
    const { secondsLeft } = this.state;
    return (
      <div>
        Timer:
        {' '}
        {secondsLeft}
      </div>
    );
  }
}

Timer.propTypes = {
  time: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Timer);
