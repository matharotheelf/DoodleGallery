import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Text, useTheme } from 'react-native-paper';

export type AnimationCardProps = {
  headerText?: string,
  footerText?: string,
  animationURI?: string;
};

export function AnimationCard({
  headerText,
  footerText,
  animationURI,
}: AnimationCardProps) {

  const { colors } = useTheme();

  return (
    <Card style={[styles.card, { backgroundColor: colors.secondary }]}>
      <Card.Content>
        <Text variant="bodyMedium" style={[styles.textTop, { color: colors.primary }]}>{headerText}</Text>
      </Card.Content>
      <Card.Cover style={styles.cover} source={{ uri: animationURI }} />
      <Card.Content>
        <Text variant="bodyMedium" style={[styles.textBottom, { color: colors.primary }]}>{footerText}</Text>
      </Card.Content>
    </Card>
  )
};

const styles = StyleSheet.create({
  cover: {
    borderRadius: 0
  },
  card: {
    borderRadius: 0,
    marginBottom: 10,
  },
  textTop: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 12,
    paddingBottom: 15
  },
  textBottom: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 12,
    paddingTop: 15
  },
});
