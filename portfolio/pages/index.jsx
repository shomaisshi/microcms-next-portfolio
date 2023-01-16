import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { client } from "../libs/client";
import Header from '../components/Header'
import Footer from '../components/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ portfolio, blog }) {
  return (
    <>
      <Head>
        <title>Shoma Kato</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-xl">
        <Header />

        <div>
          {/* <p className="mt-8 text-3xl">自己紹介</p> */}
          <p>
            shomaです。<br />
            オンスクリーンデザイン/開発をメインに制作活動をしています。<br />
            WEBのフロントエンド実装を軸にUI/UXの制作、Next.js、React.jsの実装を担当いたします。<br />
            インディーズゲーム制作やアプリ制作もしています。
          </p>

          <p className='mt-8'>使用ツール</p>
          <p>React.js/Next.js/JavaScript/HTML/CSS/figma/Unity/Blender/P5JS/Godot/PICO-8</p>


          <ul className="mt-8">
            <li>2021~2023現在：株式会社ハンドサム</li>
            <li>2020~2021：株式会社ドットインストール</li>
            <li>2020：多摩美術大学統合デザイン学科卒業</li>
          </ul>

          <div className='mt-8'>
            <h2 className='text-3xl'>works</h2>
            <ul className='pl-8'>
              {portfolio.map((portfolio) => (
                <li key={portfolio.id} className='list-disc' >
                  <Link href={`/portfolio/${portfolio.id}`} >{portfolio.title}</Link>
                </li>
              ))}
            </ul>
            <div>
              <Link href={"/portfolio/page/1"} className='underline'>→works一覧を見る</Link>
            </div>
          </div>

          <div className='mt-8'>
            <h2 className='text-3xl'>blog</h2>
            <ul className='pl-8'>
              {blog.map((blog) => (
                <li key={blog.id} className='list-disc' >
                  <Link href={`/blog/${blog.id}`} className=''>{blog.title}</Link>
                </li>
              ))}
            </ul>
            <div>
              <Link href={"/blog/page/1"} className='underline'>→blog一覧を見る</Link>
            </div>
          </div>

          <div className='mt-8'>
            <h2 className='text-3xl'>contact</h2>
            <div>shoma.s.1219@gmail.com</div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  )
}


// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const portfolioData = await client.get({ endpoint: "portfolio", queries: { offset: 0, limit: 5 } });
  const blogData = await client.get({ endpoint: "blog", queries: { offset: 0, limit: 5 } });
  return {
    props: {
      portfolio: portfolioData.contents,
      blog: blogData.contents,
    },
  };
};
