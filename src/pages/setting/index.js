import React, { Component } from 'react';
import { View, Text, SafeAreaView, TextInput, Button,
         AsyncStorage, ToastAndroid, Alert, Platform} from 'react-native';
// Redux
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { doSaveSetting } from '../../actions/setting';

import { styles } from '../../styles';
import { SettingContent, CommonContent } from '../../contents';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
    this.notifyMessage = this.notifyMessage.bind(this);
  }

  componentDidMount() {
    this.setState(this.props.setting);
  }

  handleChange(name, value) {
    this.setState({ [name]: value });
  }

  notifyMessage(msg) {
    if (Platform.OS == 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      Alert.alert(msg);
    }
  }

  async handleSubmit() {
    try {
      await AsyncStorage.setItem('setting', JSON.stringify(this.state));
      this.props.doSaveSetting(this.state);
      this.notifyMessage("Ayarlar kaydedildi");
    } catch (error) {
      this.notifyMessage("Bir sorun oluştu")
    }
  }

  render() {
    const { workTime, halfBreakTime, fullBreakTime, pomodoroCount } = this.state;
    return (
      <SafeAreaView>
        <KeyboardAwareScrollView style={[styles.container, styles.marginTop20]}>
          <View style={styles.margin5}>
            <View style={styles.marginBottom10}>
              <Text style={styles.title}> Setting </Text>
            </View>
            <View style={styles.margin5}>
              <Text> {SettingContent.activeWorkTime} </Text>
              <TextInput style={styles.settingTextInput}
                         editable={false}
                         keyboardType="numeric"
                         placeholder="25"
                         value={workTime + ''}
                         onChangeText={(e) => this.handleChange('workTime', e)}/>
            </View>
            <View style={styles.margin5}>
              <Text> {SettingContent.halfBreak} </Text>
              <TextInput style={styles.settingTextInput}
                         editable={false}
                         keyboardType="numeric"
                         placeholder="5"
                         value={halfBreakTime + ''}
                         onChangeText={(e) => this.handleChange('halfBreakTime', e)}/>
            </View>
            <View style={styles.margin5}>
              <Text> {SettingContent.fullBreak} </Text>
              <TextInput style={styles.settingTextInput}
                         keyboardType="numeric"
                         placeholder="20"
                         value={fullBreakTime + ''}
                         onChangeText={(e) => this.handleChange('fullBreakTime', e)}/>
            </View>
            <View style={styles.margin5}>
              <Text> {SettingContent.pomodoroCount} </Text>
              <TextInput style={styles.settingTextInput}
                         keyboardType="numeric"
                         placeholder="8"
                         value={pomodoroCount + ''}
                         onChangeText={(e) => this.handleChange('pomodoroCount', e)}/>
            </View>
            <Button title = {CommonContent.save}
                    onPress={this.handleSubmit}/>
          </View>
        </KeyboardAwareScrollView>
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
