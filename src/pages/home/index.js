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
    }
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

  render() {
    const { isStart } = this.state;
    return (
      <SafeAreaView>
        <View style={styles.homeContainer}>
          <View style={{flex: 1,backgroundColor: 'powderblue'}}>

          </View>
          <View style={styles.timeContainer}>
            <TouchableOpacity onPress={() => {
                                        if (!isStart)
                                          this.setState({isStart: true})}}>
              <View style={styles.timerBorder}>
                <Text style={styles.timerText}>
                  { isStart ?  "12:23" : CommonContent.start }
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
