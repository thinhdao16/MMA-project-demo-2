import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  label: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  right: {
    width: '30%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    marginBottom: 25,
  },
  videos: {
    backgroundColor: '#262626',
    height: 40,
    margin: 10,
    marginTop: 2,
    borderRadius: 10,
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    marginBottom: 10,
  },
  videosText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },

  btnImage: {
    backgroundColor: 'white',
    height: 32,
    margin: 10,
    marginTop: 2,
    borderRadius: 10,
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    marginBottom: 10,
    width:142
  },
  imagesText: {
    color: '#262626',
    fontSize: 15,
    fontWeight: 'bold',
  },

  labelText: {
    color: 'white',
    fontSize: 16,
    margin: 15,
    fontWeight: '500',
  },
  containerText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: 10,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
    marginTop: 10,
  },
  text2: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '500',
  },
  textInput: {
    backgroundColor: '#262626',
    height: 40,
    margin: 10,
    borderRadius: 10,
    paddingLeft: 50,
    padding: 5,
    marginBottom: 10,
    fontSize: 18,
    color: 'white',
    marginHorizontal: 15,
    width:250,
  },
  iconInput: {
    margin: 10,
    padding: 10,
    paddingLeft: 20,
    position: 'absolute',
  },
});
export default styles;
