export interface StudyParticipant {
  name: string;
  role: string;
  githubId?: string;
  bio?: string;
}

export interface StudyReview {
  author: string;
  githubId?: string;
  date: string;
  content: string;
}

export interface Study {
  id: string;
  name: string;
  category: string;
  description: string;
  period: string;
  participants: number;
  tags: string[];
  thumbnail: string;
  status: 'active' | 'completed' | 'recruiting';
  leader?: string;
  schedule?: string;
  requirements?: string[];
  achievements?: string[];
  detailedDescription?: string;
  curriculum?: string[];
  participantList?: StudyParticipant[];
  reviews?: StudyReview[];
  location?: string;
  meetingLink?: string;
}

export const studies: Study[] = [
  {
    id: 'fe-mock-assignment-study-2025',
    name: 'FE 모의 과제 스터디',
    category: 'Frontend',
    description:
      '프론트엔드 모의 과제인 moon cheese를 각 주마다 한 챕터씩 풀고, 각자 문제해결 방법을 공유하고 인사이트를 얻기 위한 스터디',
    period: '2025년 11월 ~ 2025년 12월',
    participants: 5,
    tags: ['과제테스트'],
    thumbnail: '/studies/algorithm-study.png',
    status: 'completed',
    leader: '스터디장: 용현',
    schedule: '주 1회 월요일 22:00 ~ 24:00',
    location: '온라인 (Discord)',
    meetingLink: 'https://github.com/hacks-team/moon-cheese',
    detailedDescription:
      '프론트엔드 모의 과제인 moon cheese를 각 주마다 한 챕터씩 풀고, 각자 문제해결 방법을 공유하고 인사이트를 얻는 스터디입니다. 매주 월요일 저녁 늦은 시간에 진행했지만 모두가 열정적으로 참여하며 서로의 코드 철학과 작성 방식을 공유했습니다.',
    participantList: [
      {
        name: '엽용현',
        role: '스터디장',
        githubId: 'raymondanythings',
      },
      {
        name: '유영민',
        role: '참여자',
        githubId: 'yu-ratel',
      },
      {
        name: '주유나',
        role: '참여자',
        githubId: 'YounaJ00',
      },
      {
        name: '양현빈',
        role: '참여자',
        githubId: 'YangHyeonBin',
      },
      {
        name: '김동현',
        role: '참여자',
        githubId: 'donghyun1998',
      },
    ],
    reviews: [
      {
        author: '엽용현',
        githubId: 'raymondanythings',
        date: '2025년 12월',
        content: '다들 넘 잘하셔서 저또한 많이 배운것 같아요',
      },
      {
        author: '유영민',
        githubId: 'yu-ratel',
        date: '2025년 12월',
        content: '너무 유익한 시간이었습니다 감사합니다!!',
      },
      {
        author: '주유나',
        githubId: 'YounaJ00',
        date: '2025년 12월',
        content: '매 세션마다 진짜 배운게 많았습니다!!! 정말 감사드려요!!',
      },
      {
        author: '양현빈',
        githubId: 'YangHyeonBin',
        date: '2025년 12월',
        content:
          '이렇게 스터디 기회 마련해주신 덕분에 한달동안 정말! 많이 배웠습니다!! 과제 소스 주시고 매주 스터디 이끌어주신 용현님, 자기만의 코드 철학을 많이 공유해주신 동현님, 또 다른 코드 작성 방식과 다양한 의견 내주신 영민님, 열심히 참여하고 배우고 질문하면서 성장하는 모습 보여주신 유나님 모두 한달동안 고생 많으셨고 감사해요!',
      },
      {
        author: '김동현',
        githubId: 'donghyun1998',
        date: '2025년 12월',
        content:
          '1달동안 넘 재밌었습니당 월요일 저녁에 늦은 시간에 진행했는데도 다들 열정 안꺼지고 적극적으로 참여하셔서 더 재미있었습니다!!',
      },
    ],
  },
];

export function getGithubAvatarUrl(githubId: string): string {
  return `https://github.com/${githubId}.png`;
}

export function getGithubProfileUrl(githubId: string): string {
  return `https://github.com/${githubId}`;
}

export function getActiveStudies(): number {
  return studies.filter(study => study.status === 'active').length;
}

export function getTotalStudyParticipants(): number {
  return studies.reduce((total, study) => total + study.participants, 0);
}

export function getStudyById(id: string): Study | undefined {
  return studies.find(study => study.id === id);
}

export function getStudiesByCategory(category: string): Study[] {
  return studies.filter(study => study.category === category);
}

export function getStudiesByStatus(
  status: 'active' | 'completed' | 'recruiting',
): Study[] {
  return studies.filter(study => study.status === status);
}
