import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export default function FadeWrapper({ children }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [children]);

  return <Animated.View style={{ flex: 1, opacity: fadeAnim }}>{children}</Animated.View>;
}
