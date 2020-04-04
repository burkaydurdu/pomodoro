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
      showTimerValue: 3,
      activePomodoroCount: 0,
      status: 'start',
    }

    this.startTimer = this.startTimer.bind(this);
    this.pomodoroTimerControl = this.pomodoroTimerControl.bind(this);
    this.parseStringToClock = this.parseStringToClock.bind(this);
    this.getTitle = this.getTitle.bind(this);
  }

  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem('setting');
      if (value !== null) {
        const settings = JSON.parse(value);
        this.props.doSaveSetting(settings);
      } else {
        this.props.doSaveSetting({ workTime: 25,
                                   halfBreakTime: 5,
                                   fullBreakTime: 20,
                                   pomodoroCount: 8 });
      }
    } catch (error) {
      console.log("Error");
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  pomodoroTimerControl() {
    const { workTime, halfBreakTime, fullBreakTime, pomodoroCount } = this.props.setting;
    const { status, showTimerValue, activePomodoroCount } = this.state;

    switch(status) {
      case 'start':
        this.setState({status: "work"});
        break;
      default:
        this.setState({ showTimerValue: (showTimerValue - 1) });
        break;
    }
    if(showTimerValue == '0' && status == 'work' && (activePomodoroCount % 4) != 3) {
      this.setState({ status: 'half_break',
                      showTimerValue: 4 });
    } else if(showTimerValue == '0' && status == 'work' && (activePomodoroCount % 4) == 3) {
      this.setState({ status: 'full_break',
                      showTimerValue: 10 });
    } else if(showTimerValue == '0' && (status == 'half_break' || status == 'full_break')) {
      this.setState({ status: 'work',
                      activePomodoroCount: activePomodoroCount + 1,
                      showTimerValue: 3})
    }

    if (activePomodoroCount  == pomodoroCount) {
      clearInterval(this.timer);
      this.setState({ status: 'finish',
                      isStart: false});
    }
  }

  startTimer() {
    this.setState({ isStart: true,
                    status: 'work',
                    showTimerValue: 3,
                    activePomodoroCount: 0});
    this.timer = setInterval(this.pomodoroTimerControl, 1000);
  }

  parseStringToClock(data) {
    var intData = parseInt(data, 0);
    var min = Math.floor(intData / 60);
    var sec = intData % 60;

    return ( min < 10 ? '0' + min : min) + ':' + ( sec < 10 ? '0' + sec : sec );
  }

  getTitle(status) {
    switch(status) {
      case 'start':
        return ""
      case 'work':
        return "Odaklan"
      case 'finish':
        return "Tebrikler günlük pomodoronu tamamladın"
      default:
        return "Dinlen"
    }
  }

  render() {
    const { isStart, showTimerValue, status, activePomodoroCount } = this.state;
    return (
      <SafeAreaView>
        <View style={styles.homeContainer}>
          <View style={styles.timeTitleContainer}>
            <Text style={styles.timeTitle}>
              {this.getTitle(status)}
            </Text>
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
          <View style={styles.pomodoroBoardContainer}>
            { isStart ?
                (
                  <View>
                    <Text style={styles.pomodoroBoardText}>
                      {"Tamamlanan: " + activePomodoroCount}
                    </Text>
                    <Text style={styles.pomodoroBoardText}>
                      { "Hedef: " + activePomodoroCount + "/" + this.props.setting.pomodoroCount }
                    </Text>
                  </View>
                )
                : null
            }
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
