import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Image } from 'expo-image';
import { AppState, Pressable, StyleSheet, View, Button, Dimensions, Text } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { Gyroscope } from 'expo-sensors';

export type AnimationPlayerProps = {
  animationURI?: string;
  thumbnailURI?: string;
};

export function AnimationPlayer({
  animationURI,
  thumbnailURI,
}: AnimationPlayerProps) {
  const appState = useRef(AppState.currentState);
  const animationIntervalId = useRef(null);
  const gyroscopeSubId = useRef(null);

  const [isAnimationActivated, setIsAnimationActivated] = useState<boolean>(false);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  var smoothingAlpha = 0.1;
  var animationIncrement = 3;
  const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  const player = useVideoPlayer(animationURI, player => {
    player.loop = true;
    player.playbackRate = 0.1;

    player.play();
  });

  const animationTimer = useRef(player.duration/2);
  const smoothedAnimationTimer = useRef(player.duration/2);

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  const clampToVideoDuration = (num: number): number => {
    return Math.min(Math.max(num, 0), player.duration - 0.1);
  }

  const exponentialSmoothing = (current: number, target: number, alpha: number): number => {
    return current + (target - current) * alpha;
  }

  Gyroscope.setUpdateInterval(200);

  const startAnimation = () => {
    gyroscopeSubId.current ??= Gyroscope.addListener(gyroscopeData => {
      if(isAnimationActivated) {
        animationTimer.current = clampToVideoDuration(animationTimer.current + gyroscopeData.y*animationIncrement);
      }
    });

    animationTimer.current = player.duration/2;
    smoothedAnimationTimer.current = player.duration/2;
    player.currentTime = player.duration/2;

    animationIntervalId.current ??= setInterval(() => {
      if(isAnimationActivated) {
        smoothedAnimationTimer.current = exponentialSmoothing(smoothedAnimationTimer.current, animationTimer.current, smoothingAlpha);

        player.currentTime = smoothedAnimationTimer.current;
      }
    }, 100);
  } 

  const onPressActivateAnimation = () => {
    setIsAnimationActivated(true);
  }

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        nextAppState.match(/inactive|background/) &&
        appState.current === 'active'
      ) {
        if(!!animationIntervalId.current) {
          clearInterval(animationIntervalId.current);
          animationIntervalId.current = null;
        }

        if(!!gyroscopeSubId.current) {
          Gyroscope.removeSubscription(gyroscopeSubId.current);
          gyroscopeSubId.current = null;
        }

        setIsAnimationActivated(false);
      }
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  if(!isAnimationActivated) {
    return (
      <View style={styles.container}>
        <Pressable onPress={onPressActivateAnimation}>
          <Image
            style={styles.image}
            source={thumbnailURI}
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
          />
        </Pressable>
      </View>
    );
  } else {
    return (
      <View>
        <VideoView style={styles.video} player={player}  nativeControls={false} allowsFullscreen={false} allowsPictureInPicture={false} allowsVideoFrameAnalysis={false} onFirstFrameRender={startAnimation}
    />
      </View>
    );
  }
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
  image: {
    height: deviceWidth*heightFactor,
    dthpadding: 0,
    margin: 0
  },
  controlsContainer: {
    padding: 10,
  },
});
