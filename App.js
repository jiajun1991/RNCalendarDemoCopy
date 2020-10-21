/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React ,{Component} from 'react';
import moment from 'moment'
import CalendarView from './src/calendar'
import {StyleSheet,StatusBar,SafeAreaView} from 'react-native'

class App extends Component {
  render() {
    return (
      <SafeAreaView>
<CalendarView></CalendarView>
      </SafeAreaView>
      
    )
  }
}

// const App: () => React$Node = () => {
  
//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//       <View>
//         <TouchableOpacity onPress= {onPressPrevious}>
//           <Text style = {styles.previousBtn} >上一个</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress = {onPressNext}>
//           <Text>下一个</Text>
//         </TouchableOpacity>
//       </View>
//       </SafeAreaView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
//   previousBtn: {
//     color:Colors.black,
//     fontSize:18,
//     fontWeight:'600',
//     textAlign:"center"
//   }
// });

export default App;