import Image from 'next/image'
import Link from "next/link";
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import MyHead from '../components/MyHead'
import Header from '../components/Header'
import Footer from '../components/Footer'
import GameGallery from '../components/GameGallery'

const inter = Inter({ subsets: ['latin'] })

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { faDonut } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <>
      <MyHead
        pageTitle={'games'}
        pageDescription={'shomaのポートフォリオサイトです。'}
        pageImg={'https://microcms-next-portfolio-ebon.vercel.app/OGP.png'}
      />

      <main className="">
        <Header page={'games'} />
        {/* <Image
          src="/images/retro_pc_heaader.png"
          alt="プロフィール画像"
          width={1000}
          height={600}
          className='w-full'
        /> */}
        <div className=' p-6 md:p-8 leading-relaxed md:text-xl md:w-[700px] m-auto'>
          <GameGallery />

          <div className='mt-16 text-3xl font-bold'>
            <p><Link href={"/portfolio/page/1"} >▶︎ Other Works</Link></p>
            {/* <p><Link href={"/blog/page/1"} >▶︎ Blog</Link></p>
            <p><Link href={"/about"} >▶︎ About</Link></p>
            <p><a href="https://donutshunter.itch.io" target="_blank" rel="noreferrer">▶︎ Itch.io</a></p>
            <p><a href="https://twitter.com/DonutsHunter" target="_blank" rel="noreferrer">▶︎ X</a></p> */}
          </div>
        </div>

      </main>

      <Footer />
    </>
  )
}
