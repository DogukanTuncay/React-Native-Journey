import React from 'react';
import { UserProvider } from './context/UserContext';
import Navigator from './navigation/AppNavigator';

export default function App() {
  return (
    <UserProvider>
      <Navigator />
    </UserProvider>
  );
}
