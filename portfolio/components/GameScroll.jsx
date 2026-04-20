'use client'

import Image from 'next/image'
import { useRef } from 'react'

const GAMES = [
  {
    title: 'MotionRec',
    imagelink: '/images/MotionRec_keyart.png',
    description: '動きを記録し、再生して進む"レコードパズルアクション"',
    url: 'https://donutshunter.itch.io/hinjin-oukoku',
  },
  {
    title: 'にんじんおうこく！',
    imagelink: '/images/ninjin_oukoku.png',
    description: 'うさぎとにんじんのパズルプラットフォーマー！！',
    url: 'https://donutshunter.itch.io/hinjin-oukoku',
  },
  {
    title: 'ビルの管理人',
    imagelink: '/images/bill_sokoban.png',
    description: 'レトロなビルに清掃のお手伝いに行くことになりました。部屋を片付けよう。',
    url: 'https://donutshunter.itch.io/bill-sokoban',
  },
  {
    title: 'MOTIONREC（PICO-8 ver）',
    imagelink: '/images/motionrec.gif',
    description: '「動きを記録して再生する」というコンセプトのアクションパズル',
    url: 'https://donutshunter.itch.io/motionrec',
  },
  {
    title: 'クラゲガイド',
    imagelink: '/images/firesidejam.png',
    description: 'クラゲの群れを案内してゴールまで連れて行こう',
    url: 'https://donutshunter.itch.io/jellyfish-guide',
  },
  {
    title: '行列のできるクスリ屋',
    imagelink: '/images/clickerjam.gif',
    description: '勇者に薬草を売ってお金を稼ごう。魔物を育てて勇者の来店率UP',
    url: 'https://donutshunter.itch.io/drugstore-rush',
  },
  {
    title: 'リリースノート',
    imagelink: '/images/brackeysjam.gif',
    description: 'ブロック崩しをクリアするごとにアップデートが入り仕様が変わっていく',
    url: 'https://donutshunter.itch.io/release-note-eternal',
  },
  {
    title: 'Pick Up バレット',
    imagelink: '/images/juicejam_title.gif',
    description: '弾を拾いながら進むシューティングゲーム',
    url: 'https://donutshunter.itch.io/pick-up-bullet',
  },
  {
    title: 'Re:ドリーム',
    imagelink: '/images/lsdjam.gif',
    description: '夢ではよく会う人がいてよくいく町がありよく死ぬ場所がある。そして朝起きる。',
    url: 'https://donutshunter.itch.io/re-dream',
  },
]

export default function GameScroll() {
  const scrollRef = useRef(null)

  const scroll = (dir) => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir === 'right' ? 280 : -280, behavior: 'smooth' })
  }

  return (
    <section className="mt-4 px-6 ">
      <div className="flex items-center justify-between mb-5 px-1 border-t border-gray-200 pt-10">
        <h2 className="text-2xl font-bold">作ったゲーム</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            aria-label="左へスクロール"
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:border-gray-500 hover:text-gray-800 transition-colors"
          >
            ←
          </button>
          <button
            onClick={() => scroll('right')}
            aria-label="右へスクロール"
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:border-gray-500 hover:text-gray-800 transition-colors"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-8 scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {GAMES.map((game) => (
          <a
            key={game.title}
            href={game.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-none w-44 group"
          >
            <div className="relative w-44 h-44 rounded-md overflow-hidden bg-gray-100">
              <Image
                src={game.imagelink}
                alt={game.title}
                fill
                sizes="176px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <p className="mt-2 text-base font-medium text-gray-800 leading-snug line-clamp-1">
              {game.title}
            </p>
            <p className="mt-0.5 text-base text-gray-500 leading-relaxed line-clamp-2">
              {game.description}
            </p>
          </a>
        ))}
      </div>
    </section>
  )
}
