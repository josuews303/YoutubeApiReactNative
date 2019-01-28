/*This is an Example of YouTube integration in React Native*/
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  PixelRatio,
  Dimensions,
  Platform,
  ImageBackground
} from 'react-native';
import YouTube, {
  YouTubeStandaloneIOS,
  YouTubeStandaloneAndroid,
} from 'react-native-youtube';
 
export default class RCTYouTubeExample extends React.Component {
  state = {
    isReady: false,
    status: null,
    quality: null,
    error: null,
    isPlaying: true,
    isLooping: true,
    duration: 0,
    currentTime: 0,
    fullscreen: false,
    containerMounted: false,
    containerWidth: null,

    id_video:this.props.navigation.state.params.id_video,
    title:this.props.navigation.state.params.title,
    description:this.props.navigation.state.params.description
  };
 
  render() {
    return (
      
      <ScrollView 
     
        style={styles.container}
        onLayout={({
          nativeEvent: {
            layout: { width },
          },
        }) => {
          if (!this.state.containerMounted)
            this.setState({ containerMounted: true });
          if (this.state.containerWidth !== width)
            this.setState({ containerWidth: width });
        }}>
  
          <YouTube
          apiKey="AIzaSyDQ06TAChj1Faf-7BsXSIqwzUzf5CTsz28"
          videoId={this.state.id_video}   // The YouTube video ID
          play={true}             // control playback of video with true/false
          fullscreen={true}       // control whether the video should play in fullscreen or inline
          loop={true}             // control whether the video should loop when ended

          onReady={e => this.setState({ isReady: true })}
          onChangeState={e => this.setState({ status: e.state })}
          onChangeQuality={e => this.setState({ quality: e.quality })}
          onError={e => this.setState({ error: e.error })}

          style={{ alignSelf: 'stretch', height: 300 }}
        />
        <ImageBackground source={require('../../img/video.jpg')} style={styles.container}>
        <Text style={styles.welcome}>Título:</Text>
        <Text style={styles.welcome}>{this.state.title}</Text>
        <Text style={styles.welcome}>Descripción:</Text>
        <Text style={styles.welcome}>{this.state.description}</Text>
        </ImageBackground>
      </ScrollView>
    );
  }
}
 
const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    width: '100%', height: '100%'
    //justifyContent: 'center',
  },
  container: {
    flex:1,
    backgroundColor: '#16426B',
    width: '100%', height: '100%'
  },
  title:{
    textAlign: 'center',
    fontSize:30,
    margin:10,
    color:'white'
  },
  description:{
    textAlign: 'center',
    fontSize:25,
    margin: 10,
    color:'white'
  },
  welcome: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    color:'white'
  },
  buttonGroup: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'blue',
  },
  buttonTextSmall: {
    fontSize: 15,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  player: {
    alignSelf: 'stretch',
    marginVertical: 10,
  },
});
