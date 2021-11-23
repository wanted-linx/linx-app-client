import React, { useState } from 'react';
import type { FC } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { DateTime } from 'luxon';

import styles from './HomeMain.style';
import { Button, ImageCarousel, TouchableView, Project } from '../../Common';
import type { ImageData, ProjectData } from '../../Common';
import globalStyles from '../../../style/styles';
import { PlanCategory, MarketingCategory, DevCategory, DesignCategory, AddIconWhite } from '../../../assets/images';
import { BottomModal } from '../../modal';

interface HomeMainPresenterProps {
  bannerImages: ImageData[];
  projects: ProjectData[];
  onPressImage: (url: string) => void;
  onPressProject: (projectId: number) => void;
}

const categories = [
  { icon: <PlanCategory />, name: '기획' },
  { icon: <MarketingCategory />, name: '마케팅' },
  { icon: <DevCategory />, name: '개발' },
  { icon: <DesignCategory />, name: '디자인' },
];

const HomeMainPresenter: FC<HomeMainPresenterProps> = ({ bannerImages, projects, onPressImage, onPressProject }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModalVisible = () => setModalVisible((visible) => !visible);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      overScrollMode="never"
      bounces={false}>
      <ImageCarousel data={bannerImages} onPress={onPressImage} />
      <View style={styles.categoryContainer}>
        {categories.map((category, index) => (
          <TouchableView key={index} viewStyle={styles.category}>
            <View style={styles.categoryImage}>{category.icon}</View>
            <Text style={globalStyles.textBody14}>{category.name}</Text>
          </TouchableView>
        ))}
      </View>
      <View style={styles.registerContainer}>
        <Text style={globalStyles.textBody15R}>기업이신가요?</Text>
        <Button
          title="프로젝트 등록하기"
          icon={() => <AddIconWhite />}
          style={styles.registerButton}
          onPress={toggleModalVisible}
        />
      </View>
      <Text style={[globalStyles.textHeadline20, styles.projectTitle]}>인기 프로젝트</Text>
      {projects.map((project) => (
        <Project key={project.projectId} project={project} onPress={onPressProject} />
      ))}
      {modalVisible ? (
        <BottomModal
          title="회원이신가요?"
          subtitle={'프로젝트를 등록하기 전에\n로그인을 먼저 해주세요'}
          buttonTexts={['회원가입', '로그인']}
          onPressClose={toggleModalVisible}
          onPresses={[() => console.log('회원가입'), () => console.log('로그인')]}
        />
      ) : null}
    </ScrollView>
  );
};

export default HomeMainPresenter;
