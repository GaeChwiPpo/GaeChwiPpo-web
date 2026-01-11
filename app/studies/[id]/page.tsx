import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Calendar,
  Users,
  BookOpen,
  MapPin,
  Award,
  ExternalLink,
} from 'lucide-react';
import { getStudyById } from '@/data/studies';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StudyPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: StudyPageProps): Promise<Metadata> {
  const { id } = await params;
  const study = getStudyById(id);

  if (!study) {
    return {
      title: '스터디를 찾을 수 없습니다 | 개취뽀',
    };
  }

  return {
    title: `${study.name} | 개취뽀 스터디`,
    description: study.description,
  };
}

const StudyPage = async ({ params }: StudyPageProps) => {
  const { id } = await params;
  const study = getStudyById(id);

  if (!study) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <img
                src="/logo.png"
                alt="개취뽀 로고"
                className="w-10 h-10 rounded-lg"
              />
              <span className="text-xl font-bold text-white">개취뽀</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/#speakers"
                className="text-gray-300 hover:text-white transition-colors"
              >
                연사 정보
              </Link>
              <Link
                href="/#studies"
                className="text-gray-300 hover:text-white transition-colors"
              >
                스터디 활동
              </Link>
              <Link
                href="/#community"
                className="text-gray-300 hover:text-white transition-colors"
              >
                커뮤니티 채널
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <Link
          href="/#studies"
          className="inline-flex items-center text-blue-500 hover:text-blue-700 mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          스터디 목록으로 돌아가기
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Sidebar - Study Info */}
          <div className="md:col-span-1">
            <div className="bg-gray-900 p-6 rounded-lg sticky top-24">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge
                    variant="outline"
                    className={
                      study.status === 'active'
                        ? 'bg-green-500/20 text-green-300 border-green-500/50'
                        : study.status === 'recruiting'
                          ? 'bg-blue-500/20 text-blue-300 border-blue-500/50'
                          : 'bg-gray-500/20 text-gray-300 border-gray-500/50'
                    }
                  >
                    {study.status === 'active'
                      ? '진행중'
                      : study.status === 'recruiting'
                        ? '모집중'
                        : '완료'}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-purple-300 border-purple-500/50 bg-purple-500/20"
                  >
                    {study.category}
                  </Badge>
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">
                  {study.name}
                </h1>
                <p className="text-gray-400 mb-4">{study.description}</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-300">
                  <Calendar className="h-5 w-5 text-blue-400 mr-3" />
                  <div>
                    <div className="text-xs text-gray-500">기간</div>
                    <div className="text-sm">{study.period}</div>
                  </div>
                </div>
                <div className="flex items-center text-gray-300">
                  <BookOpen className="h-5 w-5 text-blue-400 mr-3" />
                  <div>
                    <div className="text-xs text-gray-500">일정</div>
                    <div className="text-sm">{study.schedule}</div>
                  </div>
                </div>
                {study.location && (
                  <div className="flex items-center text-gray-300">
                    <MapPin className="h-5 w-5 text-blue-400 mr-3" />
                    <div>
                      <div className="text-xs text-gray-500">장소</div>
                      <div className="text-sm">{study.location}</div>
                    </div>
                  </div>
                )}
                <div className="flex items-center text-gray-300">
                  <Users className="h-5 w-5 text-blue-400 mr-3" />
                  <div>
                    <div className="text-xs text-gray-500">참여 인원</div>
                    <div className="text-sm">{study.participants}명</div>
                  </div>
                </div>
              </div>

              {study.tags && study.tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-white mb-2">
                    태그
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {study.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs bg-blue-500/20 text-blue-300 border-blue-500/30"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {study.meetingLink && study.status !== 'completed' && (
                <div className="mt-6">
                  <a
                    href={study.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      스터디 참여하기
                    </Button>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right Content - Details */}
          <div className="md:col-span-2">
            {/* Detailed Description */}
            {study.detailedDescription && (
              <div className="bg-gray-900 p-6 rounded-lg mb-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  스터디 소개
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  {study.detailedDescription}
                </p>
              </div>
            )}

            {/* Curriculum */}
            {study.curriculum && study.curriculum.length > 0 && (
              <div className="bg-gray-900 p-6 rounded-lg mb-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  커리큘럼
                </h2>
                <ul className="space-y-3">
                  {study.curriculum.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start text-gray-300 text-sm"
                    >
                      <span className="text-blue-400 mr-3 mt-1">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements */}
            {study.requirements && study.requirements.length > 0 && (
              <div className="bg-gray-900 p-6 rounded-lg mb-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  참여 요건
                </h2>
                <ul className="space-y-2">
                  {study.requirements.map((req, index) => (
                    <li
                      key={index}
                      className="flex items-start text-gray-300 text-sm"
                    >
                      <span className="text-blue-400 mr-3">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Achievements */}
            {study.achievements && study.achievements.length > 0 && (
              <div className="bg-gray-900 p-6 rounded-lg mb-6">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Award className="h-5 w-5 text-yellow-400 mr-2" />
                  주요 성과
                </h2>
                <ul className="space-y-2">
                  {study.achievements.map((achievement, index) => (
                    <li
                      key={index}
                      className="flex items-start text-gray-300 text-sm"
                    >
                      <span className="text-yellow-400 mr-3">✓</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Participants */}
            {study.participantList && study.participantList.length > 0 && (
              <div className="bg-gray-900 p-6 rounded-lg mb-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  참여자 ({study.participantList.length}명)
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {study.participantList.map((participant, index) => (
                    <Card
                      key={index}
                      className="bg-gray-800/50 border-gray-700"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <img
                            src={
                              participant.avatar ||
                              '/speakers/default-avatar.png'
                            }
                            alt={participant.name}
                            className="w-12 h-12 rounded-full border-2 border-blue-500"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-white text-sm">
                                {participant.name}
                              </h3>
                              {participant.role === '스터디장' && (
                                <Badge
                                  variant="outline"
                                  className="text-xs bg-yellow-500/20 text-yellow-300 border-yellow-500/50"
                                >
                                  {participant.role}
                                </Badge>
                              )}
                            </div>
                            {participant.bio && (
                              <p className="text-xs text-gray-400 mt-1">
                                {participant.bio}
                              </p>
                            )}
                            {participant.github && (
                              <a
                                href={participant.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-400 hover:underline mt-1 inline-block"
                              >
                                GitHub
                              </a>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            {study.reviews && study.reviews.length > 0 && (
              <div className="bg-gray-900 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-white mb-4">
                  참여 후기 ({study.reviews.length})
                </h2>
                <div className="space-y-4">
                  {study.reviews.map((review, index) => (
                    <Card
                      key={index}
                      className="bg-gray-800/50 border-gray-700"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <img
                              src={
                                review.avatar || '/speakers/default-avatar.png'
                              }
                              alt={review.author}
                              className="w-10 h-10 rounded-full"
                            />
                            <div>
                              <CardTitle className="text-sm text-white">
                                {review.author}
                              </CardTitle>
                              <div className="mt-1">
                                <span className="text-xs text-gray-500">
                                  {review.date}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {review.content}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 mt-16">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src="/logo.png"
                  alt="개취뽀 로고"
                  className="w-8 h-8 rounded-lg"
                />
                <span className="text-xl font-bold">개취뽀</span>
              </div>
              <p className="text-gray-400">개발자 취업을 뽀개는 커뮤니티</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">커뮤니티</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="/speakers"
                    className="hover:text-white transition-colors"
                  >
                    연사 정보
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#studies"
                    className="hover:text-white transition-colors"
                  >
                    스터디 활동
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#activities"
                    className="hover:text-white transition-colors"
                  >
                    활동 소개
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#community"
                    className="hover:text-white transition-colors"
                  >
                    커뮤니티 채널
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">참여하기</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="/apply"
                    className="hover:text-white transition-colors"
                  >
                    연사 신청
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sponsor-apply"
                    className="hover:text-white transition-colors"
                  >
                    후원 신청
                  </Link>
                </li>
                <li>
                  <a
                    href="https://open.kakao.com/o/gPI6kTUg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    카카오톡 오픈채팅
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.gg/X74q5Yw3Sv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    디스코드 채널
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">문의</h3>
              <ul className="space-y-2 text-gray-400">
                <li>academey@gmail.com</li>
                <li>카카오톡 오픈채팅</li>
                <li>디스코드 커뮤니티</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 개취뽀. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StudyPage;
