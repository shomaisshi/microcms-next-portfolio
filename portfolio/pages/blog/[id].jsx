// pages/blog/[id].js

import { client } from "../../libs/client";
import MyHead from '../../components/MyHead'
import Header from '../../components/Header'
import Link from "next/link";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import GameScroll from '@/components/GameScroll'
// import ScrollRotateImage from '@/components/ScrollRotateImage'

dayjs.extend(utc);
dayjs.extend(timezone);

export default function BlogId({ blog, blogList }) {
    return (
        <div>
            <MyHead
                pageTitle={blog.title}
                pageDescription={'shomaのブログです。'}
                pageImg={blog.eyecatch ? blog.eyecatch.url + '?fit=max&w=1200&fm=webp' : 'https://microcms-next-portfolio-ebon.vercel.app/OGP.png'}
            />
            <Header page={'blog'} />
            <main className="md:w-[700px] md:p-8 md:m-auto">
                <div className="leading-relaxed">
                    {blog.eyecatch ? <img src={blog.eyecatch.url + "?fit=max&w=1024&fm=webp"} alt="eyecatch" className="aspect-video object-cover w-full" /> : null}
                    <div className="p-6">
                        <h1 className="md:mt-8 text-3xl md:text-4xl font-bold">{blog.title}</h1>
                        <div className='mt-4 flex gap-1 items-center'>
                            <FontAwesomeIcon icon={faCalendar} className="h-[14px]" />
                            <div className="">{dayjs.utc(blog.publishedAt).tz('Asia/Tokyo').format('YYYY-MM-DD')}</div>
                        </div>
                        <div className="mt-12 post"
                            dangerouslySetInnerHTML={{ __html: `${blog.content}` }}
                        />

                    </div>
                </div>

                {/* プロフィールカード */}
                {/* <div className="p-6 flex justify-center">
                    <a href="https://x.com/DonutsHunter"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex gap-4 items-center p-4 md:p-8 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors w-fit"
                    >
                        <img
                            src="/shoma_icon.jpg"
                            alt="shoma"
                            className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover flex-shrink-0"
                        />
                        <div>
                            <div className="font-bold text-xl">shoma <span className="font-normal text-slate-500">@DonutsHunter</span></div>
                            <div className="text-slate-500 text-sm md:text-base">Game Developer</div>
                            <div className="text-slate-500 text-sm md:text-base">小さなゲームを作ります。pico8を使ってゲームジャムに参加するのが好きです。</div>
                        </div>
                        <svg className="w-6 h-6 text-slate-400 ml-1" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622z" />
                        </svg>
                    </a>
                </div> */}

                {/* ▼ 記事一覧 */}
                <div className="px-6 pb-12">
                    <h2 className="text-2xl font-bold mb-4 border-t pt-8">開発のきろく（最新20件表示）</h2>
                    <ul className="flex flex-col">
                        {blogList.map((item) => (
                            <li key={item.id} className="list-none">
                                <Link href={`/blog/${item.id}`}>
                                    <div className={`flex hover:bg-slate-100 p-4 rounded-md ${item.id === blog.id ? 'opacity-40 pointer-events-none' : ''}`}>
                                        <div className="w-72">
                                            <div className="text-sm leading-4">{dayjs.utc(item.publishedAt).tz('Asia/Tokyo').format('YYYY-MM-DD')}</div>
                                            <div className="font-bold text-base md:text-xl">{item.title}</div>
                                        </div>
                                        <div className="ml-auto pl-2">
                                            {item.eyecatch ?
                                                <img src={item.eyecatch.url + "?fit=max&w=200&fm=webp"} alt="eyecatch" className="aspect-square object-cover w-[100px] rounded-lg" />
                                                : null}
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-12">
                        <Link href={"/blog/page/1"} className='hover:underline'>
                            <div className="flex items-center gap-1 text-2xl">
                                <FontAwesomeIcon icon={faArrowLeft} className="h-[14px]" />
                                開発のきろく一覧に戻る
                            </div>
                        </Link>
                    </div>
                </div>

                {/* ゲーム一覧 */}
                {/* <GameScroll /> */}

            </main >
            {/* <ScrollRotateImage src="/images/ninjinkun_rotate.png" /> */}
        </div >
    );
}

// export const getStaticPaths = async () => {
//     const data = await client.get({ endpoint: "blog", queries: { offset: 0, limit: 20 } });
//     const paths = data.contents.map((content) => `/blog/${content.id}`);
//     return { paths, fallback: false };
// };
export const getStaticPaths = async () => {
    // まず総件数を取得
    const countData = await client.get({
        endpoint: "blog",
        queries: { limit: 0 }
    });

    // 全件のIDを取得
    const data = await client.get({
        endpoint: "blog",
        queries: {
            limit: countData.totalCount,
            fields: "id",
        }
    });

    const paths = data.contents.map((content) => `/blog/${content.id}`);
    return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
    const id = context.params.id;

    // 記事本文と一覧を並列取得
    const [data, listData] = await Promise.all([
        client.get({ endpoint: "blog", contentId: id }),
        client.get({
            endpoint: "blog",
            queries: {
                limit: 20,
                fields: "id,title,publishedAt,eyecatch",
            }
        }),
    ]);

    data.content = data.content.replace(
        /"(https?:\/\/images\.microcms-assets\.io\/.+?\.(jpe?g|png))"/gi,
        '"$1?fit=max&w=700&h=600&fm=webp"'
    );

    return {
        props: {
            blog: data,
            blogList: listData.contents,
        },
    };
};