import React, { Component } from 'react';
import { View, Text, SafeAreaView, TextInput, Button, AsyncStorage } from 'react-native';
// Redux
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { doSaveSetting } from '../../actions/setting';

import { styles } from '../../styles';
import { SettingContent, CommonContent } from '../../contents';

class Setting extends Component {

  constructor(props) {
    super(props);

    this.state = {
      workTime: '25',
      halfBreakTime: '5',
      fullBreakTime: '20',
      pomodoroCount: '8',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState(this.props.setting);
  }

  handleChange(name, value) {
    this.setState({ [name]: value });
  }

  async handleSubmit() {
    try {
      await AsyncStorage.setItem('setting', JSON.stringify(this.state));
      this.props.doSaveSetting(this.state);
    } catch (error) {
      console.log("Error")
    }
  }

  render() {
    const { workTime, halfBreakTime, fullBreakTime, pomodoroCount } = this.state;
    return (
      <SafeAreaView>
        <View>
          <Text style={styles.title}> Setting </Text>
        </View>
        <View>
          <Text> {SettingContent.activeWorkTime} </Text>
          <TextInput style={styles.settingTextInput}
                     editable={false}
                     keyboardType="numeric"
                     placeholder="25"
                     value={workTime}
                     onChangeText={(e) => this.handleChange('workTime', e)}/>
        </View>
        <View>
          <Text> {SettingContent.halfBreak} </Text>
          <TextInput style={styles.settingTextInput}
                     editable={false}
                     keyboardType="numeric"
                     placeholder="5"
                     value={halfBreakTime}
                     onChangeText={(e) => this.handleChange('halfBreakTime', e)}/>
        </View>
        <View>
          <Text> {SettingContent.fullBreak} </Text>
          <TextInput style={styles.settingTextInput}
                     keyboardType="numeric"
                     placeholder="20"
                     value={fullBreakTime}
                     onChangeText={(e) => this.handleChange('fullBreakTime', e)}/>
        </View>
        <View>
          <Text> {SettingContent.pomodoroCount} </Text>
          <TextInput style={styles.settingTextInput}
                     keyboardType="numeric"
                     placeholder="8"
                     value={pomodoroCount}
                     onChangeText={(e) => this.handleChange('pomodoroCount', e)}/>
        </View>
        <Button title = {CommonContent.save}
                onPress={this.handleSubmit}/>
      </SafeAreaView>
    )
  }
}

Setting.propTypes = {
  setting: PropTypes.object
}

const mapStateToProps = state => ({
  setting: state.setting.setting,
});

export default connect(mapStateToProps, { doSaveSetting }) (Setting);
