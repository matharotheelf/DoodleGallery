import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Text, useTheme } from 'react-native-paper';
import { AnimationPlayer } from '@/app/components/animation-player';

export type AnimationCardProps = {
  headerText?: string,
  footerText?: string,
  animationURI?: string;
  thumbnailURI?: string;
};

export function AnimationCard({
  headerText,
  footerText,
  animationURI,
  thumbnailURI,
}: AnimationCardProps) {

  const { colors } = useTheme();

  return (
    <Card style={[styles.card, { backgroundColor: colors.secondary }]}>
      <Card.Content>
        <Text variant="bodyMedium" style={[styles.textTop, { color: colors.primary }]}>{headerText}</Text>
      </Card.Content>
      <AnimationPlayer animationURI={animationURI} thumbnailURI={thumbnailURI} />
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
    marginBottom: 5,
  },
  textTop: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 15,
    paddingBottom: 15,
    paddingTop: 10,
    height: 80
  },
  textBottom: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 15,
    paddingTop: 25,
    height: 60
  },
});
