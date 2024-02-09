import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './StackNavigator';
import { UserContext } from './UserContext';

export default function App() {
  return (
    <UserContext>
       <StackNavigator/>
    </UserContext>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
// App.js
// import React from 'react';
// import ChatScreenZeneb from './screens/ChatScreenZeneb';

// const App = () => {
//   return <ChatScreenZeneb/>
// };

// export default App;
