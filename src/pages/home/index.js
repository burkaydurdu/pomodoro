import React, { Component } from 'react';
import { View, Text, Button, SafeAreaView, AsyncStorage, TouchableOpacity} from 'react-native';
// Redux
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { doSaveSetting } from '../../actions/setting';

import { styles } from '../../styles';
import { CommonContent } from '../../contents';

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isStart: false,
      showTimerValue: 1500,
      activePomodoroCount: 0,
      status: 'start',
    }

    this.startTimer = this.startTimer.bind(this);
    this.pomodoroTimerControl = this.pomodoroTimerControl.bind(this);
    this.parseStringToClock = this.parseStringToClock.bind(this);
  }

  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem('setting');
      if (value !== null) {
        const settings = JSON.parse(value);
        this.props.doSaveSetting(settings);
      }
    } catch (error) {
      console.log("Error");
    }
  }

  pomodoroTimerControl() {
    const { workTime, halfBreakTime, fullBreakTime } = this.props.setting;
    const { status, showTimerValue } = this.state;
    switch(status) {
      case 'start':
        this.setState({status: "work"});
        return;
      case 'work':
        this.setState({ showTimerValue: (showTimerValue - 1) });
        return;
    }
  }

  startTimer() {
    this.setState({ isStart: true,
                    status: 'work'});
    this.timer = setInterval(this.pomodoroTimerControl, 1000);
  }

  parseStringToClock(data) {
    var intData = parseInt(data, 0);
    var min = Math.floor(intData / 60);
    var sec = intData % 60;

    return ( min < 10 ? '0' + min : min) + ':' + ( sec < 10 ? '0' + sec : sec );
  }

  render() {
    const { isStart, showTimerValue } = this.state;
    return (
      <SafeAreaView>
        <View style={styles.homeContainer}>
          <View style={{flex: 1,backgroundColor: 'powderblue'}}>

          </View>
          <View style={styles.timeContainer}>
            <TouchableOpacity onPress={() => {
                                        if (!isStart)
                                          this.startTimer()}}>
              <View style={styles.timerBorder}>
                <Text style={styles.timerText}>
                  { isStart ? this.parseStringToClock(showTimerValue)
                            : CommonContent.start }
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1,backgroundColor: 'steelblue'}}>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

Home.propTypes = {
  setting: PropTypes.object
}

const mapStateToProps = state => ({
  setting: state.setting.setting,
  isSave: state.setting.isSaveSetting,
});

export default connect(mapStateToProps, { doSaveSetting }) (Home);
