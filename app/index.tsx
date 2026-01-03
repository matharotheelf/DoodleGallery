import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import { Appbar, useTheme } from 'react-native-paper';
import { AnimationCard } from '@/components/animation-card';

export default function Index() {
  const { colors } = useTheme();

  return (
    <FlatList style={{ backgroundColor: colors.primary }}
      ListHeaderComponent={() => (
        <Appbar.Header style={[styles.header, { backgroundColor: colors.primary }]}>
          <Appbar.Content titleStyle={[styles.headerTitle, { color: colors.secondary }]} title="GALLERY XYZ" />
        </Appbar.Header>
      )}

      data={[
         {
          animationURI: "https://picsum.photos/700",
          headerText: "\"We only confess our little faults to persuade people that we have no big ones.\"",
          footerText: "— La Rochefoucauld, Maxim 339",
        },
         {
          animationURI: "https://picsum.photos/700",
          headerText: "\"We only confess our little faults to persuade people that we have no big ones.\"",
          footerText: "— La Rochefoucauld, Maxim 339",
        },
         {
          animationURI: "https://picsum.photos/700",
          headerText: "\"We only confess our little faults to persuade people that we have no big ones.\"",
          footerText: "— La Rochefoucauld, Maxim 339",
        },
         {
          animationURI: "https://picsum.photos/700",
          headerText: "\"We only confess our little faults to persuade people that we have no big ones.\"",
          footerText: "— La Rochefoucauld, Maxim 339",
        },
      ]}
      renderItem={({item}) => <AnimationCard animationURI={item.animationURI} headerText={item.headerText} footerText={item.footerText} />}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    paddingBottom: 10,
    height: 100, 
  },
  headerTitle: {
    letterSpacing: 8,
    fontSize: 22,
    textAlign: 'center',
  },
});
