import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet, View, Button, Dimensions, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { Gyroscope } from 'expo-sensors';

export type AnimationPlayerProps = {
  animationURI?: string;
};

export function AnimationPlayer({
  animationURI,
}: AnimationPlayerProps) {

  var animationTimer = 0;
  var smoothedAnimationTimer = 0;
  var smoothingAlpha = 0.1;
  var animationIncrement = 3;

  const player = useVideoPlayer(animationURI, player => {
    player.loop = true;
    player.playbackRate = 0.1;
    player.play();
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  const clampToVideoDuration = (num: number): number => {
    return Math.min(Math.max(num, 0), player.duration - 0.1);
  }

  const exponentialSmoothing = (current: number, target: number, alpha: number): number => {
    return current + (target - current) * alpha;
  }

  const startAnimation = () => {
    Gyroscope.setUpdateInterval(200)

    Gyroscope.addListener(gyroscopeData => {
      animationTimer = clampToVideoDuration(animationTimer + gyroscopeData.y*animationIncrement);
    })
    
    const interval = setInterval(() => {
      smoothedAnimationTimer = exponentialSmoothing(smoothedAnimationTimer, animationTimer, smoothingAlpha)

      player.currentTime = smoothedAnimationTimer;
    }, 50);
  } 

  return (
    <View>
      <VideoView style={styles.video} player={player}  nativeControls={false} allowsFullscreen={false} allowsPictureInPicture={false} allowsVideoFrameAnalysis={false} onFirstFrameRender={startAnimation}

  />
    </View>
  );
}

let deviceWidth = Dimensions.get('window').width;
let heightFactor = 1.5;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  video: {
    height: deviceWidth*heightFactor,
    dthpadding: 0,
    margin: 0
  },
  controlsContainer: {
    padding: 10,
  },
});
