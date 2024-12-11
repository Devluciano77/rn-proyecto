import React, { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet, Text, Image, FlatList, TextInput, TouchableOpacity } from 'react-native';

import { getSingleCharacter , getFilterCharacter } from '../../Services/api'

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  image: string
}

interface CharacterView {
  id: number;
  name: string;
  image: string
}

export default function TabTwoScreen() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewCharacters , setViewCharacters] = useState<CharacterView[]>([]);

  const [text, setText] = useState('');

  const selectCharacter = (id: number) => {
    const loadSingleCharacter = async () => {
      try {
        const data = await getSingleCharacter(id);
        console.log(data);
      } catch (err) {
        setError('Error al cargar los datos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadSingleCharacter()
  };

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        const data = await getFilterCharacter(text);
        setCharacters(data); 
      } catch (err) {
        setError('Error al cargar los datos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadCharacters();
  }, [text]);

  useEffect(() => {
    if (characters) {
      const mappedCharacters = characters.map((e) => ({
        id: e.id,
        name: e.name,
        image: e.image,
      }));
      setViewCharacters(mappedCharacters);
    }
  },[characters])

  const GridCharacters = () => {
    return(
      <>
        <FlatList
          data={viewCharacters}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.cell}
              onPress={() => selectCharacter(item.id)}
              
            >
              <Image
                style={styles.tinyLogo}
                source={{
                  uri: item.image,
                }}
              />
              <Text style={styles.cellText}>{item.name}</Text>
            </TouchableOpacity>  
          )}
          numColumns={3}
          contentContainerStyle={styles.container}
        />
      </>
    )
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={setText}
          value={text}
          placeholder="buscar personaje"
        />
      </SafeAreaView>
      <SafeAreaView style={styles.container}>
        {viewCharacters &&
          <GridCharacters />
        }
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    marginBottom: 10, 
    backgroundColor: '#09f'
  },
  cell: {
    flex: 1, 
    marginHorizontal: 5,
    marginVertical:5,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  cellText: {
    fontSize: 16,
    color: '#333',
  },
  tinyLogo: {
    width: 100,
    height: 100,
  },
});
