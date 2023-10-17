import React, { useState } from 'react';
import { View } from 'react-native';
import { MD3DarkTheme, MD3Theme, TextInput } from 'react-native-paper';

import styleFile from './styles';

interface Props {
  handleTextSearch: (text: string) => void;
}

const SearchBar: React.FC<Props> = ({handleTextSearch}) => {
  const styles = styleFile();
  const [text, setText] = useState('');
  const customTheme: MD3Theme = {
    ...MD3DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      primary: '#05a45c',
      onSurfaceVariant: '#05a45c',
    },
    roundness: 30
  }
  return (
    <View style={styles.container}>
      <TextInput
        label='Pesquisar por algo...'
        style={styles.inputText}
        underlineStyle={{display: 'none'}}
        right={<TextInput.Icon color='#05a45c' icon='magnify'/>}
        theme={customTheme}
        value={text}
        onChangeText={text => {setText(text); handleTextSearch(text)}}
      />
    </View>
  )
}
export default SearchBar;
