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
              <View style={styles.marginBottom10}>
                <Text style={[styles.subTitle, styles.marginBottom5]}>
                  {AboutContent.title2}
                </Text>
                <View>
                  <Text style={styles.aboutContent}>{AboutContent.technicalList1}</Text>
                  <Text style={styles.aboutContent}>{AboutContent.technicalList2}</Text>
                  <Text style={styles.aboutContent}>{AboutContent.technicalList3}</Text>
                  <Text style={styles.aboutContent}>{AboutContent.technicalList4}</Text>
                </View>
              </View>
              <View style={styles.marginBottom10}>
                <Text style={[styles.subTitle, styles.marginBottom5]}>
                  {AboutContent.title3}
                </Text>
                <View>
                  <Text style={[styles.aboutContent, styles.marginBottom5]}>{AboutContent.row3}</Text>
                  <Text style={[styles.aboutContent, styles.marginBottom5]}>{AboutContent.row4}</Text>
                  <Text style={[styles.aboutContent, styles.marginBottom5]}>{AboutContent.row5}</Text>
                </View>
              </View>
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
