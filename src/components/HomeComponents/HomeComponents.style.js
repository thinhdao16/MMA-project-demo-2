import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  line: {
    height: '100%',
    flex: 1,
    borderTopWidth: 0.4,
    borderTopColor: '#3a3a3a',
    marginTop: 10,
  },
  topleft: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  profilImage: {
    width: 33,
    height: 33,
    borderRadius: 100,
    marginRight: 10,
    marginLeft: 7,
  },
  profilImageComment: {
    width: 20,
    height: 20,
    borderRadius: 100,
    marginRight: 10,
    marginLeft: 7,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 13,
    color: 'white',
    marginTop: -10
  },
  pointPost: {
    fontWeight: '300',
    fontSize: 13,
    color: 'white',
    marginTop: -25,
    marginLeft: 59
  },
  ımage: {
    width: '100%',
    height: 370,
    resizeMode: 'cover',
  },
  leftIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '32%',
    marginLeft: 20,
  },
  ıconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,
  },

  likeText: {
    marginLeft: 20,
    marginTop: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  postName: {
    marginLeft: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 2,
  },
  time: {
    marginLeft: 20,
    fontSize: 10,
    color: 'grey',
  },
  comment: {
    marginLeft: 20,
    marginTop: 10,
    opacity: 0.8,
    color: 'grey',
  },
  topContainer: {
    paddingTop: 6,
  },
  top2: {
    marginLeft: 15,
  },
  circle: {
    width: 75,
    height: 75,
    backgroundColor: 'black',
    borderWidth: 1.5,
    borderRadius: 100,
    borderColor: '#2E2E2E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  myStory: {
    width: 75,
    height: 75,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: {
    position: 'absolute',
    zIndex: 1,
    bottom: 5,
    right: 5,
    backgroundColor: 'white',
    borderRadius: 100,
  },
  image2: {
    width: '90%',
    height: '90%',
    borderRadius: 100,
    borderWidth: 0.8,
    borderColor: '#2E2E2E',
  },
  textLabel: {
    textAlign: 'center',
    fontSize: 12,
    color: 'white',
    marginTop: 5,
  },
  body: {
    height: '7%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  icon: {
    height: 30,
    width: 150,
    resizeMode: 'contain',
    margin: 5,
    // alignItems: 'center',
    marginLeft: -5,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '40%',
    marginRight: 10,
  },
  logoContainer: {
    marginTop: 5,
    marginLeft: -30,
  },
  input: {
    backgroundColor: '#363636',
    height: 30,
    margin: 10,
    borderRadius: 10,
    paddingLeft: 40,
    padding: 5,
    marginBottom: 5,
    fontSize: 16,
    color: 'white',
    marginHorizontal: 15,
  },
  sheetImage: {
    width: 35,
    height: 35,
    borderRadius: 100,
    margin: 10,
  },
  sheetLabel: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
  },
  image_bank: {
    height: 340,
    width: 340,
    resizeMode: 'contain',
    margin: 5,
    alignItems: 'center',
    borderRadius: 20,
  },
  textInput: {
    backgroundColor: 'black',
    height: 40,
    margin: 10,
    borderRadius: 10,
    paddingLeft: 50,
    padding: 5,
    marginBottom: 10,
    fontSize: 18,
    color: 'white',
    marginHorizontal: 15,
    width: 340,
  },
  iconInput: {
    margin: 10,
    padding: 10,
    paddingLeft: 20,
    position: 'absolute',
  },
  btnImage: {
    backgroundColor: '#445de2',
    height: 32,
    margin: 10,
    marginTop: 15,
    borderRadius: 25,
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    marginBottom: 10,
    width: 142
  },
  imagesText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  btnImagePost: {
    backgroundColor: '#445de2',
    height: 50,
    margin: 10,
    marginTop: 15,
    borderRadius: 25,
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    marginBottom: 30,
    width: 340
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  iconPointPostPlus: {
    fontSize: 20,
    color: "#48cb61",
  },
  iconPointPostMinus: {
    fontSize: 20,
    color: "#ff0000",
  },
  image_bank: {
    height: 340,
    width: 340,
    resizeMode: 'contain',
    margin: 5,
    alignItems: 'center',
    borderRadius: 20,
  },
});
