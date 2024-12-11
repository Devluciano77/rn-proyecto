import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Button, Text, View, FlatList } from 'react-native';
import React, { useEffect , useState } from 'react';
import { ThemedView } from '@/components/ThemedView';

import { getCharacters } from '../../Services/api'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


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

type ItemProps = {title: string};

const Item = ({title}: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default function HomeScreen() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewList, setViewList] = useState(false);
  const [error, setError] = useState('');

  const [viewCharacters , setViewCharacters] = useState<CharacterView[]>([]);

  const onPressLearnMore = () => {
    const viewStateCharacters = characters.map((e) => {
      return {
        id: e.id,
        name: e.name,
        image: e.image,
      };
    });
    if (viewStateCharacters.length > 0) {
      setViewCharacters(viewStateCharacters);
      console.log(viewCharacters.length);
    }
    setViewList(!viewList); 
  }

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        const data = await getCharacters(); 
        setCharacters(data);
      } catch (err) {
        setError('Error al cargar los datos');
        console.error(err);
      } finally {
        setLoading(false); 
      }
    };
    loadCharacters();
  }, []);

  return (
    <>
    <View style={styles.container}>
    <StatusBar style="light" />
      <ThemedView style={styles.titleContainer}>
        <Button
          onPress={onPressLearnMore}
          title="pulsar"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
          disabled={loading}
        />
      </ThemedView>

      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          {viewList &&
            <FlatList
              data={viewCharacters}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <Item title={item.name} />
                  <Image
                    style={styles.tinyLogo}
                    source={{
                      uri: item.image,
                    }}
                  />
                </View>
              )}
              keyExtractor={item => String(item.id)}
            />
          }
        </SafeAreaView>
      </SafeAreaProvider>
    </View>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09f',
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    backgroundColor: '#fff',
    padding: 5,
    marginVertical: 4,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 26,
  },
  tinyLogo: {
    width: 100,
    height: 100,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
