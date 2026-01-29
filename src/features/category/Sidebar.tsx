import React, { FC, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Colors } from '@utils/Constants';
import SidebarItem from './SideBarItem';


const ITEM_HEIGHT = 100;

interface SidebarProps {
  selectedCategory: any;
  categories: any[];
  onCategoryPress: (category: any) => void;
}

const Sidebar: FC<SidebarProps> = ({
  selectedCategory,
  categories,
  onCategoryPress,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const indicatorPosition = useSharedValue(0);

  useEffect(() => {
    const targetIndex = categories.findIndex(
      c => c._id === selectedCategory?._id,
    );

    if (targetIndex !== -1) {
      indicatorPosition.value = withTiming(targetIndex * ITEM_HEIGHT, {
        duration: 400,
      });
      scrollViewRef.current?.scrollTo({
        y: targetIndex * ITEM_HEIGHT,
        animated: true,
      });
    }
  }, [selectedCategory]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: indicatorPosition.value }],
  }));

  return (
    <View style={styles.sideBar}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[styles.indicator, indicatorStyle]} />

        {categories.map((category) => (
          <SidebarItem
            key={category._id}
            category={category}
            selected={selectedCategory?._id === category._id}
            onPress={() => onCategoryPress(category)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Sidebar;

const styles = StyleSheet.create({
  sideBar: {
    width: '24%',
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: "#eee",
    
  },
  indicator: {
    position: 'absolute',
    right: 0,
    width: 4,
    height: 60,
    top: 10,
    backgroundColor: Colors.secondary,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
});
