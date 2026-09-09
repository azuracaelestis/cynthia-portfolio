import folderYellow from '../assets/case study/folder/folder-yellow.svg';
import folderYellowHover from '../assets/case study/folder/folder-yellow-hover.svg';
import folderBlue from '../assets/case study/folder/folder-blue.svg';
import folderBrown from '../assets/case study/folder/folder-brown.svg';
import folderMobileYellow from '../assets/case study/folder-mobile/folder-mobile-yellow.svg';
import folderMobileBlue from '../assets/case study/folder-mobile/folder-mobile-blue.svg';
import folderMobileBrown from '../assets/case study/folder-mobile/folder-mobile-brown.svg';
import folderBlueHover from '../assets/case study/folder/folder-blue-hover.svg';
import arrowRight from '../assets/case study/folder-thumnail/classroom quest/arrow-right.svg';
import arrowRightBlack from '../assets/case study/folder/arrow-right-black.svg';
import classroomQuestMockup from '../assets/case study/folder-thumnail/classroom quest/Classroom Quest.jpg';
import cyanBird from '../assets/case study/folder-thumnail/classroom quest/cyan-bird.svg';
import purpleBlueBird from '../assets/case study/folder-thumnail/classroom quest/purple-blue_bird.svg';
import flyingBook from '../assets/case study/folder-thumnail/classroom quest/flying_book.svg';
import panicBubble from '../assets/case study/folder-thumnail/classroom quest/panic_bubble.svg';
import tfamThumbnailWhatsOn from '../assets/case study/folder-thumnail/tfam-app-thumbnail/thumbnail-whats-on.png';
import tfamThumbnailHome from '../assets/case study/folder-thumnail/tfam-app-thumbnail/thumbnail-home.png';
import tfamThumbnailExhibitionDetail from '../assets/case study/folder-thumnail/tfam-app-thumbnail/thumbnail-exhibition-detail.png';

export const CASE_STUDIES = [
  {
    id: 'tfam',
    tag: 'Taipei Fine Art Museum',
    title: 'A Companion for the Whole Museum Visit',
    body: 'TFAM built an app that looked good but was hard to use. I researched, redesigned, and prototyped it around the whole museum visit.',
    folder: folderYellow,
    folderMobile: folderMobileYellow,
    folderHover: folderYellowHover,
    arrowRight: arrowRightBlack,
    rotate: -5,
    link: '/work/tfam-app',
    thumbnail: {
      // Per Figma (node 316:1023): 3 fanned phone screens, left-to-right —
      // What's On list, Home (front/center), exhibition detail.
      phones: [tfamThumbnailWhatsOn, tfamThumbnailHome, tfamThumbnailExhibitionDetail],
    },
  },
  {
    id: 'classroom-quest',
    tag: 'ViewSonic Education',
    title: 'A product Update Teachers Actually Wanted to Play',
    body: 'A gamified experience that taught teachers about myViewBoard 3.0 by turning real classroom problems into play.',
    folder: folderBlue,
    folderMobile: folderMobileBlue,
    folderHover: folderBlueHover,
    arrowRight,
    rotate: 4,
    link: '/work/classroom-quest',
    thumbnail: {
      mockup: classroomQuestMockup,
      birdLeft: cyanBird,
      birdRight: purpleBlueBird,
      book: flyingBook,
      bubble: panicBubble,
    },
  },
  {
    id: 'asia-money',
    tag: 'Asia Money Fintech',
    title: 'Revamping the marketing homepage',
    body: "Turning a 13-year-old B2B homepage into a funnel built to sell loans directly to everyday consumers.",
    folder: folderBrown,
    folderMobile: folderMobileBrown,
    rotate: -3,
  },
];
