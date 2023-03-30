import Image from 'next/image'
import Link from "next/link";
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { client } from "../libs/client";
import MyHead from '../components/MyHead'
import Header from '../components/Header'
import Footer from '../components/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ portfolio, blog }) {
  return (
    <>
      <MyHead
        pageTitle={'about'}
        pageDescription={'shomaのポートフォリオサイトです。'}
        pageImg={'https://microcms-next-portfolio-ebon.vercel.app/OGP.png'}
      />

      <main className="">
        <Header page={'about'} />

        <div className='md:w-8/12 p-2 md:p-8 leading-relaxed md:text-xl'>
          {/* <Image src="/OGP.png" alt="" width={200} height={200} /> */}
          <p className='mt-0'>
            shomaです。<br />
            インディーゲーム作ったりしてます。<br />
          </p>
          <p>→<a href='https://donutshunter.itch.io' className='hover:underline'>作った小さなゲーム作品（itchへとびます）</a></p>
          <p>→<Link href='blog/page/1' className='hover:underline'>適当なブログ</Link></p>
          <p>→<Link href='portfolio/page/1' className='hover:underline'>今まで作ったものいろいろ</Link></p>

          {/* <div className='mt-16'>
            <h2 className='text-3xl'><Link href={"/portfolio/page/1"} >＞works</Link></h2>
            <ul className='pl-8 mt-2'>
              {portfolio.map((portfolio) => (
                <li key={portfolio.id} className='list-disc' >
                  <Link href={`/portfolio/${portfolio.id}`} >{portfolio.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className='mt-8'>
            <h2 className='text-3xl'><Link href={"/blog/page/1"} >＞blog</Link></h2>
            <ul className='pl-8 mt-2'>
              {blog.map((blog) => (
                <li key={blog.id} className='list-disc' >
                  <Link href={`/blog/${blog.id}`} className=''>{blog.title}</Link>
                </li>
              ))}
            </ul>
          </div> */}

          <div className="mt-16">
            <h2>Shoma Kato</h2>
            <div>ゲームジャマー</div>

            <div className='mt-4'>2021~2023現在：株式会社ハンドサム</div>
            <div>2020~2021：株式会社ドットインストール</div>
            <div>2020：多摩美術大学統合デザイン学科卒業</div>
          </div>

          <div className='mt-8'>
            <h2>Contact</h2>
            <div>shoma.s.1219@gmail.com</div>
            <div>
              <div className='flex gap-3'>
                <a href="https://twitter.com/home" target="_blank" rel="noreferrer">Twitter</a>
                <a href="https://note.com/shoma_dev" target="_blank" rel="noreferrer">note</a>
                <a href="https://donutshunter.itch.io" target="_blank" rel="noreferrer">itch</a>
              </div>
              <div className='flex gap-3'>
                <a href="https://github.com/shomaisshi" target="_blank" rel="noreferrer">Github</a>
                <a href="https://zenn.dev/shomaisshi?tab=scraps" target="_blank" rel="noreferrer">Zenn</a>
              </div>
            </div>
          </div>
        </div>

      </main>

      <Footer />
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
