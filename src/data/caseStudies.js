import folderYellow from '../assets/case study/folder/folder-yellow.svg';
import folderBlue from '../assets/case study/folder/folder-blue.svg';
import folderBrown from '../assets/case study/folder/folder-brown.svg';
import folderMobileYellow from '../assets/case study/folder-mobile/folder-mobile-yellow.svg';
import folderMobileBlue from '../assets/case study/folder-mobile/folder-mobile-blue.svg';
import folderMobileBrown from '../assets/case study/folder-mobile/folder-mobile-brown.svg';
import folderBlueHover from '../assets/case study/folder/folder-blue-hover.svg';
import classroomQuestMockup from '../assets/case study/folder-thumnail/classroom quest/Classroom Quest.jpg';
import cyanBird from '../assets/case study/folder-thumnail/classroom quest/cyan-bird.svg';
import purpleBlueBird from '../assets/case study/folder-thumnail/classroom quest/purple-blue_bird.svg';
import flyingBook from '../assets/case study/folder-thumnail/classroom quest/flying_book.svg';
import panicBubble from '../assets/case study/folder-thumnail/classroom quest/panic_bubble.svg';

export const CASE_STUDIES = [
  {
    id: 'tfam',
    tag: 'Taipei Fine Art Museum',
    title: 'A companion for the whole museum visit',
    body: 'TFAM already had an app, but low ratings and buried features meant most visitors never used it. I led an end-to-end redesign that reframed the brief from...',
    folder: folderYellow,
    folderMobile: folderMobileYellow,
    rotate: -5,
  },
  {
    id: 'classroom-quest',
    tag: 'ViewSonic Education',
    title: 'A product Update Teachers Actually Wanted to Play',
    body: 'A gamified experience that taught teachers about myViewBoard 3.0 by turning real classroom problems into play.',
    folder: folderBlue,
    folderMobile: folderMobileBlue,
    folderHover: folderBlueHover,
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
