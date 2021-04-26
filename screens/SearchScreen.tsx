import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      {/** search by title or artist */}

      {/** filter genre */}

      {/** filter year */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      width:'100%',
      height:'auto'
  },
});
