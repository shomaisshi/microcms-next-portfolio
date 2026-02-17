// pages/blog/page/[id].js
import Link from 'next/link';
import Image from 'next/image';
import { Pagination } from '../../../components/Pagination';
import { client } from "../../../libs/client";
import MyHead from '../../../components/MyHead'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import GameGallery from '../../../components/GameGallery'

// dayjs
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

dayjs.extend(utc);
dayjs.extend(timezone);

const PER_PAGE = 8;

// pages/blog/[id].js
export default function BlogPageId({ blog, totalCount, currentPage }) {
    return (
        <div>
            <MyHead
                pageTitle={'blog'}
                pageDescription={'shomaのブログ一覧ページです。'}
                pageImg={'https://microcms-next-portfolio-ebon.vercel.app/OGP.png'}
            />
            <Header page={'blog'} />

            {/* main  */}
            <div className='p-2 md:p-8'>

                <div className="md:flex flex-col md:w-[700px] m-auto gap-4">
                    <h2 className='text-3xl'>ブログ記事一覧</h2>
                    <ul className="flex flex-col md:text-xl mt-4">
                        {blog.map((blog) => (
                            <li key={blog.id} className='list-none md:text-xl'>
                                <Link href={`/blog/${blog.id}`} className='' >
                                    <div className='flex hover:bg-slate-100 p-4 rounded-md'>
                                        <div className='w-72'>
                                            <div className="text-sm leading-4">{dayjs.utc(blog.publishedAt).tz('Asia/Tokyo').format('YYYY-MM-DD')}</div>
                                            <div className='text-base md:text-xl'>{blog.title}</div>
                                        </div>
                                        <div className='ml-auto'>
                                            {blog.eyecatch ?
                                                <img src={blog.eyecatch.url + "?fit=max&w=1024&fm=webp"} alt="eyecatch" className="aspect-square object-cover w-[100px] rounded-lg" />
                                                : null}
                                        </div>
                                    </div>

                                </Link>
                            </li>
                        ))}
                    </ul>

                    <Pagination totalCount={totalCount} currentPage={currentPage} folder={'blog'} per_page={PER_PAGE} />
                </div>
            </div>

            <Footer />
        </div >
    );
}

// 動的なページを作成
// export const getStaticPaths = async () => {
//     const repos = await client.get({ endpoint: "blog" });

//     const range = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i);

//     const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map((repo) => `/blog/page/${repo}`);

//     return { paths, fallback: false };
// };

export const getStaticPaths = async () => {
    // 総件数のみ取得（limit=0で件数だけ取得）
    const repos = await client.get({
        endpoint: "blog",
        queries: {
            limit: 0  // 件数のみ取得、実際のコンテンツは不要
        }
    });

    const range = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i);
    const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map((repo) => `/blog/page/${repo}`);

    return { paths, fallback: false };
};

// 全てのデータを取得（？）
// export const getStaticProps = async (context) => {
//     const id = context.params.id;

//     const data = await client.get({ endpoint: "blog", queries: { offset: (id - 1) * PER_PAGE, limit: PER_PAGE } });
//     data.contents.map(function (item) {
//         item.content = item.content.replace(
//             /"(https?:\/\/images\.microcms-assets\.io\/.+?\.(jpe?g|gif|png))"/g,
//             '"$1?fit=max&w=1024&fm=webp"'
//         );
//     });

//     return {
//         props: {
//             blog: data.contents,
//             totalCount: data.totalCount,
//         },
//     };
// };

// getStaticProps内の修正
export const getStaticProps = async (context) => {
    const id = context.params.id;
    const currentPage = parseInt(id); // 現在のページ番号

    const data = await client.get({
        endpoint: "blog",
        queries: {
            offset: (id - 1) * PER_PAGE,
            limit: PER_PAGE,
            fields: "id,title,publishedAt,eyecatch"
        }
    });

    return {
        props: {
            blog: data.contents,
            totalCount: data.totalCount,
            currentPage: currentPage, // 現在ページを追加
        },
    };
};