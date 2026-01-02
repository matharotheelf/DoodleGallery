import { Text, View, FlatList, ScrollView } from "react-native";
import { PaperProvider, Appbar, Banner } from 'react-native-paper';
import { AnimationCard } from '@/components/animation-card';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

export default function Index() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <FlatList
          ListHeaderComponent={() => (
            <Appbar.Header>
              <Appbar.Content titleStyle={{ textAlign: 'center' }} title="G a l l e r y  X Y Z" />
            </Appbar.Header>
          )}

          data={[
            {key: 'Devin'},
            {key: 'Dan'},
            {key: 'Dominic'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
          ]}
          renderItem={({item}) => <AnimationCard />}
        />
      </SafeAreaProvider>
    </PaperProvider>
  );
}
