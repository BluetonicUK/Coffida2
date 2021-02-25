import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  flexContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#d1e8d7',
    flexDirection: 'column',
    alignItems: 'center',
  },

  shop: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#52e37b',
    borderRadius: 6,
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#d1e8d7',
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
  },

  // shop2: {
  //   //flex: 1,
  //   borderWidth: 1,
  //   borderColor: '#52e37b',
  //   borderRadius: 6,
  //   justifyContent: 'space-around',
  //   flexDirection: 'column',
  //   backgroundColor: '#d1e8d7',
  //   paddingLeft: 20,
  //   paddingRight: 20,
  //   marginBottom: 2,
  //   marginTop: 3,
  //   height: '60%',
  //   width: '100%',
  // },

  star: {
    alignItems: 'flex-end',
  },

  textList: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },

  ratingView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  resultsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },

  test: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#d1e8d7',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: '#52e37b',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    height: 40,
    width: 200,
    margin: 20,
  },

  paperInput: {
    height: 45,
    width: 200,
    borderWidth: 0,
    marginBottom: 2,
  },

  reviewInput: {
    borderWidth: 1,
    borderColor: '#52e37b',
    borderRadius: 6,
    minHeight: 50,
    width: 250,
  },

  button: {
    width: 200,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#52e37b',
    margin: 20,
  },

  paperButton: {
    width: 200,
    height: 40,
    backgroundColor: '#52e37b',
    margin: 10,
  },

  buttonRed: {
    width: 200,
    height: 40,
    backgroundColor: '#ed6258',
    margin: 20,
  },

  buttonRemove: {
    width: 100,
    height: 20,
    borderRadius: 20,
    backgroundColor: '#ed6258',
  },

  mapButton: {
    width: 130,
    height: 40,
    backgroundColor: '#52e37b',
    margin: 20,
  },

  mapButtonView: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    margin: 10,
  },

  text: {
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
    padding: 8,
  },

  text2: {
    fontSize: 12,
    textAlign: 'center',
    color: 'black',
  },

  passwordBar: {
    width: '50%',
    marginLeft: 100,
    marginRight: 100,
  },

  logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
  },

  image: {
    height: 100,
    width: 100,
    borderRadius: 6,
    marginBottom: 5,
  },

  flatlist: {
    borderWidth: 1,
    borderColor: '#52e37b',
    height: 40,
    width: 300,
    paddingTop: 10,
    marginBottom: 5,
    borderRadius: 6,
  },

  flatlist2: {
    paddingHorizontal: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center',
    paddingTop: 10,
  },

  flatlist3: {
    paddingHorizontal: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'green',
    paddingBottom: 10,
  },

  flatlist4: {
    paddingHorizontal: 55,
    justifyContent: 'center',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'green',
    paddingBottom: 10,
  },
});
