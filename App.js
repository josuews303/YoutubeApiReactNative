import React from 'react';
import { ImageBackground,ActivityIndicator,Alert,TextInput,StyleSheet,ListView, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Video from './app/components/Video.js';
const APIKey = 'AIzaSyDQ06TAChj1Faf-7BsXSIqwzUzf5CTsz28'
const channelID = 'UCowb-eIN4gHPwWxsi71uvWw'
const resultsPerPage = 50

const URL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId='+channelID+'&maxResults='+resultsPerPage+'&key='+APIKey
class Menu extends React.Component {
  static navigationOptions = {
    header: null
}
constructor(props){
  super(props);
  this.state = {
    isLoading: true,
    Input_search:'',
    tittle:''
  }
  this.consulta = [];//Arreglo Global
}

 Action_Click(id,title,description){
   this.setState({title:title})
  this.props.navigation.navigate('VideoScreen',{
      id_video:id,title:title,description:description
  })
}

SearchVideo(Input_search){
     const nuevaLista = this.consulta.filter(function(item){
         const itemData = item.title.toUpperCase()
         const textData = Input_search.toUpperCase()
         return itemData.indexOf(textData) > -1
     })
     this.setState({
         dataSource: this.state.dataSource.cloneWithRows(nuevaLista),
         Input_search: Input_search
     })
 } 
 ListViewItemSeparator=()=>{
  return(
    <View
    style = {{
      height:.5,
      width:'100%',
      backgroundColor:'#2196F3'
    }}
    />
  )
}
render(){
  if(this.state.isLoading){
    return(
    
      <View style={{flex:1,paddingTop:1}}>
        <ActivityIndicator/>
      </View>
      
    )
  }
  return(
    <ImageBackground source={require('./img/menu.jpg')} style={styles.imageContainer}>
    <Text style={styles.title}>Biblioteca Digital ACI880</Text>
    <TextInput style={styles.textInput} 
          placeholder='Buscar...' 
          onChangeText={(Input_search) => this.SearchVideo(Input_search)} 
          value={this.state.Input_search}
          underlineColorAndroid='transparent'/>
<ListView
        dataSource={this.state.dataSource}
        renderSeparator={this.ListViewItemSeparator}
        renderRow={(rowData)=>
          <Text style={styles.rowViewContainer} onPress={this.Action_Click.bind(this,
            rowData.id,
            rowData.title,
            rowData.description
          )}>
            {rowData.title}
          </Text>
        }
      />
    </ImageBackground>
  )
}

componentDidMount(){
console.log(URL)
return fetch(URL)
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.consulta = responseJson.items.map(obj =>{
          return{ 
            
            id: obj.id.videoId,
            title: obj.snippet.title,
            description: obj.snippet.description
           
          }
        }) ;
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(this.consulta)
        },);
        console.log(this.consulta)
      })
      .catch((error) => {
        console.error(error);
      });
      

}
}
const RootStack = createStackNavigator(
  {
    
    MenuScreen:Menu,
    VideoScreen:{
      screen: Video,
      navigationOptions: () => ({
        title: 'Regresar a la Biblioteca',
        //header: null,
        //headerBackTitle: null
      }),
    }
  }
);
const App = createAppContainer(RootStack);
  
export default App;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    width: '100%', height: '100%'
    //justifyContent: 'center',
  },
  ContainerDataUsers:{
      flex:1,
      paddingTop:20,
      marginLeft:5,
      marginRight:5,
      alignItems: 'center',
      justifyContent: 'center',
      width:'100%'
    },
  title:{
      fontSize:30,
      marginTop:40,
      color:'white',
      //backgroundColor:'rgba{0,0,0,0}'
    },
  textInput:{
      marginTop:20,
      alignSelf:'center',
      padding: 16,
      backgroundColor:'#fff',
      textAlign:'center',
      marginBottom:7,
      height:50,
      width:300,
      borderWidth:1,
      borderColor:'#2196F3',
      borderRadius:5
  },
  rowViewContainer:{
    fontSize:20,
    padding:10,
    color:'white',
    
  }
 
});
