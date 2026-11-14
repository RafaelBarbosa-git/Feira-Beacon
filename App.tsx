import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { C, MAX_WIDTH } from './src/theme';
import { StoreProvider, useStore } from './src/store';
import { Account, Intro, Permissions } from './src/screens/entry';
import { MainShell } from './src/screens/main';
import { StandScreen } from './src/screens/stand';

function Router() {
  const { loaded, nav } = useStore();
  if (!loaded) return <View style={a.center}><ActivityIndicator size="large" color={C.blue} /></View>;
  switch (nav.entry) {
    case 'intro': return <Intro />;
    case 'permissions': return <Permissions />;
    case 'account': return <Account />;
    case 'stand': return <StandScreen />;
    default: return <MainShell />;
  }
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <StoreProvider>
        {/* No computador, o app aparece como uma coluna central do tamanho de um celular. */}
        <View style={a.outer}>
          <View style={a.frame}><Router /></View>
        </View>
      </StoreProvider>
    </SafeAreaProvider>
  );
}

const a = StyleSheet.create({
  outer: { flex: 1, backgroundColor: '#E4E1D6', alignItems: 'center' },
  frame: { flex: 1, width: '100%', maxWidth: MAX_WIDTH, backgroundColor: C.cream, overflow: 'hidden' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: C.cream },
});
