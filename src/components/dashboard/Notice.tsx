import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Defs, G, Path, Use } from 'react-native-svg';
import { NoticeHeight } from '@utils/Scaling';
import CustomText from '@components/ui/CustomText';
import { Fonts } from '@utils/Constants';
import { wavyData } from '@utils/dummyData';

const Notice: FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={[styles.noticeContainer,]}>
        <View style={{paddingTop : insets.top || 20}}>
        <CustomText
          style={styles.heading}
          variant="h8"
          fontFamily={Fonts.SemiBold}
        >
          It's raining near this location
        </CustomText>

        <CustomText variant="h9" style={styles.textCenter}>
          Our delivery partners may take longer to reach you
        </CustomText>
      </View>
      </View>

      <Svg
        width="100%"
        height={40}
        viewBox="0 0 4000 1000"
        preserveAspectRatio="none"
        style={styles.wave}
      >
        <Defs>
          <Path id="wavepath" d={wavyData} />
        </Defs>
        <G>
          <Use href="#wavepath" y="400" fill="#CCD5E4" />
        </G>
      </Svg>
    </View>
  );
};

export default Notice;

const styles = StyleSheet.create({
  container: {
    height: NoticeHeight,
    backgroundColor: '#CCD5E4',
  },
  noticeContainer: {
    justifyContent: 'center',
    backgroundColor: '#CCD5E4',
  },

  heading: {
    color: '#2D3875',
    marginBottom: 8,
    textAlign: 'center',
  },

  textCenter: {
    textAlign: 'center',
    marginBottom: 8,
    color: '#2D3875',
  },

  wave: {
    width: '100%',
    transform: [{ scaleY: -1 }],
  },
});
