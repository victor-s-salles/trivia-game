import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
// import store from '../redux/store';
import { timerOutFalse, timerOutTrue, timeMenosUm } from '../redux/actions';

class Timer extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     secondsLeft: '',
  //   };
  // }

  componentDidMount() {
    const { dispatch } = this.props; // Esse time vem do global
    dispatch(timerOutFalse());
    // this.setState({ secondsLeft: time });
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
    const { dispatch, time } = this.props;
    // const { secondsLeft } = this.state;
    // store.subscribe(() => { // Essa função escuta tudo que vem do global, toda vez que mudo, ela ouve.
    //   const globalState = store.getState();
    //   const { gameReducer: { time } } = globalState;
    //   const TRINTA = 30;
    //   if (time === TRINTA) {
    //     this.setState({ secondsLeft: time });
    //   }
    // });

    if (time > 0) {
      // this.setState((prevState) => ({
      //   secondsLeft: prevState.secondsLeft - 1,
      // }));
      dispatch(timeMenosUm());
    }
    // dispatch(timerUpdate(secondsLeft - 1));
    if (time === 0) {
      clearInterval(this.timerID);
      dispatch(timerOutTrue());
    }
  };

  render() {
    const { time } = this.props;
    return (
      <div>
        <span>
          Timer:
          {' '}
          {time}
        </span>
      </div>
    );
  }
}

Timer.propTypes = {
  time: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};
const mapStateToProps = (globalState) => ({
  timerOut: globalState.gameReducer.timerOut,
  time: globalState.gameReducer.time,

});
export default connect(mapStateToProps)(Timer);
