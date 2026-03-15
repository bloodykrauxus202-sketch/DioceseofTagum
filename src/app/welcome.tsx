import { View, Text, Image, Pressable, useWindowDimensions, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  Easing,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { useEffect, useState, useCallback, useRef } from 'react';
import { X } from 'lucide-react-native';

// Diocese of Tagum logo
const DIOCESE_LOGO = 'https://images.composerapi.com/019c1d10-9a1d-732f-93cc-606c5e55b508/assets/images/diocese_of_tagum_1770014167005_019c1d10-cfdd-7029-ad3a-c72fae1501ab.png';

// Welcome image shown when Continue is tapped
const WELCOME_IMAGE_URL = 'https://lh7-rt.googleusercontent.com/sheetsz/AHOq17GonExjMTaCxVUGFpJ6LqmVCJcc1aRkK-xNBa2z1mSspHxU14s5O9l--nTk_mQX4apQixfrXFRQvpXodb_v_QF21PMvxyLHRe8xUgyE1BFdUYh0DMmp3KNk1WnE9xaYvS09gmujM9cqrUSDNLJRw7RVlh0wq9A3DbbL4a82zVSLujYunQ?key=QgHmo9zK1Afri2bH1-6CIQ';

// Surrounding icons
const ORBIT_ICONS = [
  { id: 1, uri: 'https://images.composerapi.com/019c1d10-9a1d-732f-93cc-606c5e55b508/assets/images/parish_1770014167055_019c1d10-d00f-743e-a987-237debd39276.png', label: 'Parish' },
  { id: 2, uri: 'https://images.composerapi.com/019c1d10-9a1d-732f-93cc-606c5e55b508/assets/images/bec_1770014166604_019c1d10-ce4c-73ec-8b14-ec53d8ae6ec8.png', label: 'BEC' },
  { id: 3, uri: 'https://images.composerapi.com/019c1d10-9a1d-732f-93cc-606c5e55b508/assets/images/priest_1770014167003_019c1d10-cfdb-719a-b148-69972e03d671.png', label: 'Clergy' },
  { id: 4, uri: 'https://images.composerapi.com/019c1d10-9a1d-732f-93cc-606c5e55b508/assets/images/ministry_1770014167002_019c1d10-cfda-72db-b606-9deae6c8ee12.png', label: 'Ministry' },
  { id: 5, uri: 'https://images.composerapi.com/019c1d10-9a1d-732f-93cc-606c5e55b508/assets/images/dclaim_1770014166994_019c1d10-cfd2-772d-981c-517adc3d0e45.png', label: 'DClaim' },
  { id: 6, uri: 'https://images.composerapi.com/019c1d10-9a1d-732f-93cc-606c5e55b508/assets/images/vicariate_1770014167009_019c1d10-cfe1-7288-9416-914e3b6e55aa.png', label: 'Vicariate' },
  { id: 7, uri: 'https://images.composerapi.com/019c1d10-9a1d-732f-93cc-606c5e55b508/assets/images/schools_1770014167026_019c1d10-cff2-7388-8bf0-16ec28cf5e5e.png', label: 'School' },
  { id: 8, uri: 'https://images.composerapi.com/019c1d10-9a1d-732f-93cc-606c5e55b508/assets/images/congregation_1770014166641_019c1d10-ce71-70ab-8535-493aa862c385.png', label: 'Congregation' },
  { id: 9, uri: 'https://images.composerapi.com/019c1d10-9a1d-732f-93cc-606c5e55b508/assets/images/corporations_1770014166668_019c1d10-ce8c-75b1-b04f-5e8b0c50bfe9.png', label: 'Corporations' },
];

// Provide randomly generated positions across the screen while strictly avoiding text/logo
function generateRandomLocations(count: number, screenW: number, screenH: number, iconSize: number) {
  const locs: {x: number, y: number, delay: number}[] = [];
  
  const isOverlap = (px: number, py: number) => {
    const ix = px * (screenW - iconSize);
    const iy = py * (screenH - iconSize);
    const r1 = { x: ix, y: iy, w: iconSize, h: iconSize };
    
    const check = (r2: {x: number, y: number, w: number, h: number}) => {
      const buffer = 12; // 12px padding around sacred objects
      return !(r1.x + r1.w + buffer < r2.x || r1.x - buffer > r2.x + r2.w || r1.y + r1.h + buffer < r2.y || r1.y - buffer > r2.y + r2.h);
    };

    // 1. Text Area (Top Center)
    const textZone = { 
      x: screenW * 0.05, 
      y: screenH * 0.03, 
      w: screenW * 0.9, 
      h: screenH * 0.30 
    };
    if (check(textZone)) return true;

    // 2. Center Logo
    const logoSize = Math.min(screenW * 0.85, screenH * 0.75);
    // Use 75% of logoSize for collision since the PNG is a circle with transparent corners
    const hitSize = logoSize * 0.75;
    const logoZone = {
      x: (screenW - hitSize) / 2,
      y: (screenH - hitSize) / 2,
      w: hitSize,
      h: hitSize
    };
    if (check(logoZone)) return true;

    // 3. Bottom Button
    const btnZone = {
      x: screenW * 0.1,
      y: screenH - 120,
      w: screenW * 0.8,
      h: 100
    };
    if (check(btnZone)) return true;

    // 4. Other icons (prevent icons from stacking on each other)
    for (const l of locs) {
      if (check({
        x: l.x * (screenW - iconSize),
        y: l.y * (screenH - iconSize),
        w: iconSize,
        h: iconSize
      })) return true;
    }

    return false;
  };

  for (let i = 0; i < count; i++) {
    let attempts = 0;
    let valid = false;
    let px = -10, py = -10; // If impossible to place safely, throw off-screen

    while (!valid && attempts < 300) {
      const testX = Math.random();
      const testY = Math.random();
      if (!isOverlap(testX, testY)) {
        px = testX;
        py = testY;
        valid = true;
      }
      attempts++;
    }
    
    locs.push({
      x: px,
      y: py,
      delay: Math.random() * 400
    });
  }
  return locs;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

interface AnimatedIconProps {
  icon: typeof ORBIT_ICONS[0];
  position: { x: number; y: number };
  iconSize: number;
  screenWidth: number;
  screenHeight: number;
  delay: number;
}

function AnimatedIcon({
  icon,
  position,
  iconSize,
  screenWidth,
  screenHeight,
  delay
}: AnimatedIconProps) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  // Absolute random coordinates based on screen bounds (preventing overflowing edge)
  const x = position.x * (screenWidth - iconSize);
  const y = position.y * (screenHeight - iconSize);

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Fast pop-up to finish completely within 2 seconds
      scale.value = withTiming(1.3, { duration: 500, easing: Easing.out(Easing.ease) }, () => {
        scale.value = withTiming(0.8, { duration: 400, easing: Easing.inOut(Easing.ease) }, () => {
          scale.value = withTiming(0, { duration: 500, easing: Easing.in(Easing.ease) });
          opacity.value = withTiming(0, { duration: 500 });
        });
      });
      opacity.value = withTiming(1, { duration: 500 });
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          width: iconSize,
          height: iconSize,
          justifyContent: 'center',
          alignItems: 'center',
          left: x,
          top: y,
        },
        animatedStyle,
      ]}
    >
      <Image
        source={{ uri: icon.uri }}
        style={{ width: iconSize, height: iconSize }}
        resizeMode="contain"
      />
    </Animated.View>
  );
}

function TypingText({ text, delay = 0, className, style }: { text: string; delay?: number; className?: string; style?: any }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    let interval: ReturnType<typeof setInterval>;

    const startTimeout = setTimeout(() => {
      interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 50);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (interval) clearInterval(interval);
    };
  }, [text, delay]);

  return <Text className={className} style={style}>{displayedText}</Text>;
}

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const logoSize = Math.min(screenWidth * 0.85, screenHeight * 0.75);
  const iconSize = Math.min(screenWidth * 0.16, 75);

  const logoCenter = { x: screenWidth / 2, y: screenHeight / 2 };

  const [cycle, setCycle] = useState(0);
  const [shuffledIcons, setShuffledIcons] = useState<typeof ORBIT_ICONS>([]);
  const [shuffledPositions, setShuffledPositions] = useState<{x: number, y: number, delay: number}[]>([]);

  // Sheet modal state
  const [showSheet, setShowSheet] = useState(false);

  useEffect(() => {
    const triggerNewCycle = () => {
      setCycle(c => c + 1);
      setShuffledIcons(shuffleArray(ORBIT_ICONS));
      setShuffledPositions(generateRandomLocations(ORBIT_ICONS.length, screenWidth, screenHeight, iconSize));
    };

    // Trigger immediately
    triggerNewCycle();
    
    // Repeat strictly every 2 seconds
    const interval = setInterval(triggerNewCycle, 2000);
    return () => clearInterval(interval);
  }, []);

  const logoScale = useSharedValue(0.8);
  const logoOpacity = useSharedValue(0);
  const logoRotation = useSharedValue(0);
  const logoTranslateX = useSharedValue(0);
  const logoTranslateY = useSharedValue(0);
  const buttonOpacity = useSharedValue(0);
  const textContainerOpacity = useSharedValue(0);
  
  const romanScale = useSharedValue(0);
  const dioceseScale = useSharedValue(0);

  useEffect(() => {
    logoOpacity.value = withDelay(200, withTiming(1, { duration: 800 }));
    logoScale.value = withDelay(200, withTiming(1, { duration: 800, easing: Easing.out(Easing.back(1.5)) }));
    
    textContainerOpacity.value = withDelay(400, withTiming(1, { duration: 500 }));
    buttonOpacity.value = withDelay(800, withTiming(1, { duration: 500 }));

    romanScale.value = withDelay(1600, withSequence(
      withTiming(1.3, { duration: 600, easing: Easing.out(Easing.ease) }),
      withTiming(1, { duration: 400, easing: Easing.inOut(Easing.ease) })
    ));

    dioceseScale.value = withDelay(2400, withSequence(
      withTiming(1.3, { duration: 600, easing: Easing.out(Easing.ease) }),
      withTiming(1, { duration: 400, easing: Easing.inOut(Easing.ease) })
    ));

    // Minimal, reverent church animations
    const animInterval = setInterval(() => {
      const effect = Math.floor(Math.random() * 4);
      switch (effect) {
        case 0: // Gentle Float Up
          logoTranslateY.value = withSequence(
            withTiming(-12, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
            withTiming(0, { duration: 1500, easing: Easing.inOut(Easing.ease) })
          );
          break;
        case 1: // Spiritual Pulse (Slow Heartbeat)
          logoScale.value = withSequence(
            withTiming(1.03, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
            withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) })
          );
          break;
        case 2: // Holy Glow (very subtle scale down/up)
          logoScale.value = withSequence(
            withTiming(0.98, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
            withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) })
          );
          break;
        case 3: // Minimal Sway (Barely rotates 2 degrees)
          logoRotation.value = withSequence(
            withTiming(1.5, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
            withTiming(-1.5, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
            withTiming(0, { duration: 1000, easing: Easing.inOut(Easing.ease) })
          );
          break;
      }
    }, 4000); // 4 second loops for slower, highly respectful animations

    return () => clearInterval(animInterval);
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: logoTranslateX.value },
      { translateY: logoTranslateY.value },
      { scale: logoScale.value },
      { rotateZ: `${logoRotation.value}deg` }
    ],
    opacity: logoOpacity.value,
  }));

  const textContainerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textContainerOpacity.value,
  }));

  const romanAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: romanScale.value }]
  }));

  const dioceseAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: dioceseScale.value }]
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ translateY: interpolate(buttonOpacity.value, [0, 1], [20, 0]) }],
  }));

  // Tapping Continue goes straight to Home since the image URL is expired
  const handleContinue = () => {
    router.replace('/(tabs)');
  };

  return (
    <View className="flex-1 bg-white">
      {/* Pop Icons */}
      {shuffledIcons.length > 0 && shuffledIcons.map((icon, index) => (
        <AnimatedIcon
          key={`${cycle}-${icon.id}`}
          icon={icon}
          position={shuffledPositions[index]}
          iconSize={iconSize}
          screenWidth={screenWidth}
          screenHeight={screenHeight}
          delay={shuffledPositions[index].delay}
        />
      ))}

      <View
        style={{
          flex: 1,
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Text above logo */}
        <Animated.View style={[{ position: 'absolute', top: insets.top + (screenHeight * 0.05), alignItems: 'center', paddingHorizontal: 24, zIndex: 10 }, textContainerAnimatedStyle]}>
          <TypingText
            text="Welcome to"
            delay={1000}
            className="text-gray-800 text-center"
            style={{ fontFamily: 'GreatVibes_400Regular', fontSize: 64, marginTop: -20, marginBottom: -10 }}
          />
          <Animated.View style={romanAnimatedStyle}>
            <TypingText
              text="THE ROMAN CATHOLIC"
              delay={1600}
              className="text-gray-900 text-4xl md:text-5xl font-extrabold text-center mt-6"
            />
          </Animated.View>
          <Animated.View style={dioceseAnimatedStyle}>
            <TypingText
              text="DIOCESE OF TAGUM"
              delay={2400}
              className="text-gray-900 text-4xl md:text-5xl font-extrabold text-center mt-2"
            />
          </Animated.View>
          <TypingText
            text="Your all-in-one directory for everything within the Diocese"
            delay={3200}
            className="text-gray-500 text-xl md:text-2xl font-medium text-center px-4"
            style={{ marginTop: -4 }}
          />
        </Animated.View>

        {/* Center Logo */}
        <Animated.View
          style={[
            { position: 'absolute', width: logoSize, height: logoSize, justifyContent: 'center', alignItems: 'center', zIndex: -1 },
            logoAnimatedStyle,
          ]}
        >
          <Image
            source={{ uri: DIOCESE_LOGO }}
            style={{ width: logoSize, height: logoSize }}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Continue Button */}
        <Animated.View style={[{ position: 'absolute', bottom: 60 }, buttonAnimatedStyle]}>
          <Pressable
            onPress={handleContinue}
            className="active:scale-95"
            style={{
              backgroundColor: '#1e3a5f',
              borderRadius: 10,
              paddingVertical: 12,
              paddingHorizontal: 32,
            }}
          >
            <Text className="text-white text-lg font-semibold text-center">
              Continue
            </Text>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
}
