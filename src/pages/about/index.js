import React, { Component } from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, StatusBar, FlatList } from 'react-native';
// Redux
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import { styles } from '../../styles';

import { AboutContent } from '../../contents';

class About extends Component {

  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <View>
            <Text style={styles.title}> About </Text>
            <View style={styles.aboutContentView}>
              <Text style={styles.aboutContent}>
                {AboutContent.row1}
              </Text>
              <Text style={styles.aboutContent}>
                {AboutContent.row2}
              </Text>
              <View style={styles.imageContainer}>
                <Image style={styles.aboutImage}
                  source={require('../../../assets/img/remotely.png')}
                />
              </View>
              <Text style={styles.subTitle}>
                {AboutContent.title2}
              </Text>
              <FlatList
                data={AboutContent.technicalList}
                renderItem={({item}) => <Text style={styles.aboutListText}>- {item.item}</Text>}/>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

About.propTypes = {
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {}) (About);
