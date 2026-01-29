import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import CustomText from '@components/ui/CustomText';
import { RFValue } from 'react-native-responsive-fontsize';

interface Props {
  category: any;
  selected: boolean;
  onPress: () => void;
}

const SidebarItem: React.FC<Props> = ({ category, selected, onPress }) => {
  const imageOffset = useSharedValue(-15);

  useEffect(() => {
    imageOffset.value = withTiming(selected ? 2 : -15, {
      duration: 400,
    });
  }, [selected]);

  const animatedImageStyle = useAnimatedStyle(() => ({
    bottom: imageOffset.value,
  }));

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.categoryButton}
      onPress={onPress}
    >
      <View
        style={[
          styles.imageContainer,
          selected && styles.selectedImageContainer,
        ]}
      >
        <Animated.Image
          source={{ uri: category?.image }}
          style={[styles.image, animatedImageStyle]}
        />
      </View>

      <CustomText fontSize={RFValue(7)} style={{ textAlign: 'center' }}>
        {category?.name}
      </CustomText>
    </TouchableOpacity>
  );
};

export default SidebarItem;

const styles = StyleSheet.create({
  categoryButton: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  imageContainer: {
    borderRadius: 100,
    height: '50%',
    marginBottom: 10,
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
    overflow: 'hidden',
  },
  selectedImageContainer: {
    backgroundColor: '#CFFFDB',
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
});











