import { StyleSheet, Dimensions } from 'react-native';

const windowDimensions = Dimensions.get('window');

export const styles = StyleSheet.create({

  marginBottom10: {
    marginBottom: 10,
  },

  marginBottom5: {
    marginBottom: 5,
  },

  marginTop20: {
    marginTop: 20
  },

  margin5: {
    margin: 5
  },

  margin10: {
    margin: 10,
  },

  container: {
    width: windowDimensions.width,
    height: windowDimensions.height,
  },

  title: {
    fontFamily: "sofia-pro-bold",
    fontSize: 32,
  },

  subTitle: {
    fontFamily: "sofia-pro-bold",
    fontSize: 26,
  },

  aboutContentView: {
    padding: 10,
  },

  aboutContent: {
    fontFamily: "sofia-pro-light",
    fontSize: 22,
  },

  aboutListText: {
    fontFamily: "sofia-pro-light",
    fontSize: 16,
    paddingTop: 10,
  },

  settingTextInput: {
    borderWidth: 1,
    borderColor: "#D9DBE5",
    borderRadius: 5,
    padding: 5,
    margin: 5,
    fontSize: 18,
    fontFamily: "sofia-pro-regular",
  },

  aboutImage: {
    height: Math.round(windowDimensions.width * 9 / 16),
    resizeMode: "contain",
    padding: 10,
  },

  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },

  homeContainer: {
    height: '100%',
  },

  timeContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  timerBorder: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 10,
    borderColor: "#000",
    justifyContent: 'center',
    alignItems: 'center',
  },

  timerText: {
    fontSize: 48,
    fontFamily: 'sofia-pro-bold',
    color: '#000',
  },

  timeTitleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  timeTitle: {
    fontSize: 32,
    fontFamily: 'sofia-pro-regular',
    color: '#000',
    textAlign: 'center'
  },

  pomodoroBoardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  pomodoroBoardText: {
    fontSize: 18,
    fontFamily: 'sofia-pro-light',
    color: '#000'
  }
});

