import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, MapPin, Users } from 'lucide-react';
import { getSpeakerById, getSessionBySpeakerId } from '@/data/speakers';
import { SpeakerAvatar } from '@/components/speaker-avatar';

interface SpeakerPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: SpeakerPageProps): Promise<Metadata> {
  const { id } = await params;
  const speaker = getSpeakerById(id);

  if (!speaker) {
    return {
      title: '연사를 찾을 수 없습니다 | 개취뽀',
    };
  }

  return {
    title: `${speaker.name} | 개취뽀 연사`,
    description: speaker.bio,
  };
}

const SpeakerPage = async ({ params }: SpeakerPageProps) => {
  const { id } = await params;
  const speaker = getSpeakerById(id);
  const session = getSessionBySpeakerId(id);

  if (!speaker) {
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
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <Link
          href="/speakers"
          className="inline-flex items-center text-blue-500 hover:text-blue-700 mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          모든 연사 보기
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-gray-900 p-6 rounded-lg">
              <div className="flex flex-col items-center text-center mb-6">
                <SpeakerAvatar
                  src={speaker.avatar}
                  alt={speaker.name}
                  size="xl"
                  className="mb-4"
                />
                <h1 className="text-2xl font-bold text-white">
                  {speaker.name}
                </h1>
                <p className="text-gray-400">{speaker.position}</p>
                <p className="text-blue-400">{speaker.company}</p>
              </div>

              {speaker.contact && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-white mb-2">
                    연락처
                  </h2>
                  <div className="space-y-1">
                    {speaker.contact.email && (
                      <p className="text-sm">
                        <span className="text-gray-400">이메일:</span>{' '}
                        <a
                          href={`mailto:${speaker.contact.email}`}
                          className="text-blue-400 hover:underline"
                        >
                          {speaker.contact.email}
                        </a>
                      </p>
                    )}
                    {speaker.contact.github && (
                      <p className="text-sm">
                        <span className="text-gray-400">GitHub:</span>{' '}
                        <a
                          href={speaker.contact.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline"
                        >
                          {speaker.contact.github.replace('https://', '')}
                        </a>
                      </p>
                    )}
                    {speaker.contact.linkedin && (
                      <p className="text-sm">
                        <span className="text-gray-400">LinkedIn:</span>{' '}
                        <a
                          href={speaker.contact.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline"
                        >
                          {speaker.contact.linkedin.replace('https://', '')}
                        </a>
                      </p>
                    )}
                    {speaker.contact.twitter && (
                      <p className="text-sm">
                        <span className="text-gray-400">Twitter:</span>{' '}
                        <a
                          href={speaker.contact.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline"
                        >
                          {speaker.contact.twitter.replace('https://', '')}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              )}

              {speaker.skills && speaker.skills.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold text-white mb-2">
                    기술 스택
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {speaker.skills.map(skill => (
                      <span
                        key={skill}
                        className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            {session && (
              <div className="bg-gray-900 p-6 rounded-lg mb-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  발표 세션 정보
                </h2>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-blue-400 mr-2" />
                    <span className="text-gray-300">{session.date}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-blue-400 mr-2" />
                    <span className="text-gray-300">{session.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-blue-400 mr-2" />
                    <span className="text-gray-300">
                      참석자 {session.attendees}명
                    </span>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  {session.description}
                </div>
              </div>
            )}

            <div className="bg-gray-900 p-6 rounded-lg mb-6">
              <h2 className="text-xl font-semibold text-white mb-4">소개</h2>
              <p className="text-gray-300">{speaker.bio}</p>
            </div>

            {speaker.presentation && (
              <div className="bg-gray-900 p-6 rounded-lg mb-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  발표 정보
                </h2>
                <h3 className="text-lg font-medium text-blue-400 mb-2">
                  {speaker.presentation.title}
                </h3>
                <p className="text-gray-300 mb-4">
                  {speaker.presentation.description}
                </p>

                <div className="space-y-2">
                  {speaker.presentation.slides && (
                    <a
                      href={speaker.presentation.slides}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
                    >
                      발표 자료 보기
                    </a>
                  )}
                  {speaker.presentation.video && (
                    <a
                      href={speaker.presentation.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm ml-2"
                    >
                      발표 영상 보기
                    </a>
                  )}
                </div>
              </div>
            )}

            {speaker.experience && speaker.experience.length > 0 && (
              <div className="bg-gray-900 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-white mb-4">경력</h2>
                <div className="space-y-4">
                  {speaker.experience.map((exp, index) => (
                    <div
                      key={index}
                      className="border-l-2 border-blue-500 pl-4"
                    >
                      <h3 className="font-medium text-white">{exp.company}</h3>
                      <p className="text-blue-400">{exp.position}</p>
                      <p className="text-sm text-gray-400">{exp.period}</p>
                      <p className="text-sm text-gray-300 mt-1">
                        {exp.description}
                      </p>
                    </div>
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

export default SpeakerPage;
