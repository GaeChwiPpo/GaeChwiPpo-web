import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, Building, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { meetupSessions } from '@/data/speakers';
import { SpeakerAvatar } from '@/components/speaker-avatar';

export const metadata = {
  title: '연사 정보 | 개취뽀',
  description: '개취뽀 커뮤니티의 모든 연사 정보를 회차별로 확인하세요.',
};

export default function SpeakersPage() {
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
            <nav
              className="hidden md:flex items-center space-x-6"
              role="navigation"
              aria-label="주요 메뉴"
            >
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
                href="/#activities"
                className="text-gray-300 hover:text-white transition-colors"
              >
                활동 소개
              </Link>
              <Link
                href="/#community"
                className="text-gray-300 hover:text-white transition-colors"
              >
                커뮤니티 채널
              </Link>
              <Link
                href="/#sponsors"
                className="text-gray-300 hover:text-white transition-colors"
              >
                후원
              </Link>
              <Link href="/apply">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
                >
                  연사 신청
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            연사 정보
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            개취뽀 커뮤니티의 모든 연사 정보를 회차별로 확인하세요.
          </p>
        </div>

        {/* Sessions */}
        <div className="space-y-16">
          {meetupSessions
            .slice()
            .reverse()
            .map(session => (
              <section
                key={session.sessionNumber}
                className="bg-gray-800/30 rounded-xl p-6 md:p-8"
              >
                <div className="mb-8">
                  <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                      {session.title}
                    </h2>
                    <Badge
                      variant="outline"
                      className="text-blue-300 border-blue-500/50 px-3 py-1 text-sm"
                    >
                      {session.sessionNumber}회차
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-300 text-sm mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-blue-400" />
                      <span>{session.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-2 text-blue-400" />
                      <span>{session.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-blue-400" />
                      <span>참가자 {session.attendees}명</span>
                    </div>
                  </div>
                  <p className="text-gray-400">{session.description}</p>
                  {session.video && (
                    <div className="mt-6 flex items-center gap-4">
                      <img
                        src={session.video.thumbnail}
                        alt="유튜브 썸네일"
                        className="w-40 h-24 rounded-lg border border-gray-700"
                      />
                      <a
                        href={session.video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block"
                      >
                        <Button className="bg-red-600 hover:bg-red-700 text-white font-semibold">
                          유튜브 영상 바로가기
                        </Button>
                      </a>
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {session.speakers.map(speaker => (
                    <Link href={`/speakers/${speaker.id}`} key={speaker.id}>
                      <article className="bg-gray-700/30 border border-gray-600/50 rounded-lg p-6 hover:border-blue-500/50 transition-all hover:bg-gray-700/50 cursor-pointer h-full">
                        <div className="flex items-start space-x-4 mb-4">
                          <SpeakerAvatar
                            src={speaker.avatar}
                            alt={`${speaker.name} 프로필 사진`}
                            size="md"
                            className="border-2 border-blue-500"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-white text-lg mb-1">
                              {speaker.name}
                            </h3>
                            <div className="flex items-center text-gray-400 mb-2">
                              <Building
                                className="h-4 w-4 mr-1"
                                aria-hidden="true"
                              />
                              <span className="text-sm">
                                {speaker.company} · {speaker.position}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h4 className="font-medium text-white mb-2">
                            발표 주제
                          </h4>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {speaker.topic}
                          </p>
                        </div>

                        {speaker.bio && (
                          <div className="mb-4">
                            <h4 className="font-medium text-white mb-2">
                              연사 소개
                            </h4>
                            <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                              {speaker.bio}
                            </p>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2 mb-4">
                          {speaker.tags.map((tag, tagIndex) => (
                            <Badge
                              key={tagIndex}
                              variant="secondary"
                              className="text-xs bg-blue-500/20 text-blue-300 border-blue-500/30"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                          >
                            상세 정보 보기
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
        </div>
      </main>

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
}
