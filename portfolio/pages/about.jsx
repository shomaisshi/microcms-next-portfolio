import Image from 'next/image'
import Link from "next/link";
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
// import { client } from "../libs/client";
import MyHead from '../components/MyHead'
import Header from '../components/Header'
import Footer from '../components/Footer'

const inter = Inter({ subsets: ['latin'] })

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { faDonut } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
    return (
        <>
            <MyHead
                pageTitle={'about'}
                pageDescription={'shomaのポートフォリオサイトです。'}
                pageImg={'https://microcms-next-portfolio-ebon.vercel.app/OGP.png'}
            />

            <main className="min-h-screen flex flex-col">
                <Header page={'about'} />

                <div className='md:w-8/12 p-2 md:p-8 leading-relaxed md:text-xl flex flex-col flex-1'>
                    {/* <FontAwesomeIcon icon={faDonut} className='h-[56px]' /> */}
                    <div>

                        <Image
                            src="/images/kokoha_boku_no_bill.png"
                            alt="game image"
                            width={384}              // お好みのサイズに調整
                            height={384}             // お好みのサイズに調整
                            className="mb-4"         // 必要に応じてスタイリング
                        />
                        {/* <Image
            src="/images/moon_bg_study_5.png"
            alt="game image"
            width={384}              // お好みのサイズに調整
            height={384}             // お好みのサイズに調整
            className="mb-4"         // 必要に応じてスタイリング
          /> */}

                        <p className='mt-0'>
                            shomaです。<br />
                            触って楽しいものを作るのが好き。<br /><br />
                        </p>

                        <p>→<a href='https://donutshunter.itch.io' target="_blank" className='hover:underline'>Tiny games（itchへとびます）</a></p>
                        <p>→<Link href='blog/page/1' className='hover:underline'>Blog</Link></p>
                        <p>→<Link href='portfolio/page/1' className='hover:underline'>Works</Link></p>


                        <div className="mt-16">
                            {/* <div className='mt-4'>HANDSUM inc.</div>
            <div>2020: 多摩美術大学統合デザイン学科卒業</div> */}
                        </div>
                    </div>

                    <div className='mt-auto'>
                        <h2 className='flex items-center gap-1'>
                            <FontAwesomeIcon icon={faAddressBook} className='h-[16px]' />
                            Contact
                        </h2>
                        <div>Mail: shoma.s.1219@gmail.com</div>
                        <div>
                            <div className='flex gap-3'>
                                <a href="https://twitter.com/DonutsHunter" target="_blank" rel="noreferrer">X: @DonutsHunter</a>
                                {/* <a href="https://note.com/shoma_dev" target="_blank" rel="noreferrer">note</a> */}
                                {/* <a href="https://donutshunter.itch.io" target="_blank" rel="noreferrer">itch.io</a> */}
                            </div>
                            {/* <div className='flex gap-3'>
                                <a href="https://github.com/shomaisshi" target="_blank" rel="noreferrer">Github</a>
                                <a href="https://zenn.dev/shomaisshi?tab=scraps" target="_blank" rel="noreferrer">Zenn</a>
                            </div> */}
                        </div>
                    </div>
                </div>

            </main>

            {/* <Footer /> */}
        </>
    )
}


// データをテンプレートに受け渡す部分の処理を記述します
// export const getStaticProps = async () => {
//     const portfolioData = await client.get({ endpoint: "portfolio", queries: { offset: 0, limit: 5 } });
//     const blogData = await client.get({ endpoint: "blog", queries: { offset: 0, limit: 5 } });
//     return {
//         props: {
//             portfolio: portfolioData.contents,
//             blog: blogData.contents,
//         },
//     };
// };
