// pages/blog/page/[id].js
import Link from 'next/link';
import { Pagination } from '../../../components/Pagination';
import { client } from "../../../libs/client";
import MyHead from '../../../components/MyHead'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'

// dayjs
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const PER_PAGE = 6;

// pages/blog/[id].js
export default function BlogPageId({ blog, totalCount }) {
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
                <div className="mt-2 md:flex gap-4">
                    {/* <div>
                        {blog.map((blog) => (
                            <div key={blog.id} className="mb-20 md:mb-36 leading-relaxed">
                                <div className="">{dayjs.utc(blog.publishedAt).tz('Asia/Tokyo').format('YYYY-MM-DD')}</div>
                                <div className="mt-2">
                                    <Link href={`/blog/${blog.id}`} className="text-2xl md:text-3xl font-bold">{blog.title}</Link>
                                </div>
                                <div className="mt-6 post"
                                    dangerouslySetInnerHTML={{
                                        __html: `${blog.content}`,
                                    }}
                                />
                            </div>
                        ))}
                        <Pagination totalCount={totalCount} folder={'blog'} />
                    </div> */}

                    <div className='max-w-[900px] ml-auto mr-auto'>
                        <div className='md:text-2xl font-bold'>blog</div>
                        <ul className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4 gap-y-12 md:text-xl">
                            {blog.map((blog) => (
                                <li key={blog.id} className='list-none md:text-xl'>
                                    <Link href={`/blog/${blog.id}`} className='' >
                                        {blog.eyecatch ? <img src={blog.eyecatch.url + "?fit=max&w=1024&fm=webp"} alt="eyecatch" className="aspect-video object-cover w-full rounded-md" /> : null}
                                        <div className="text-sm">{dayjs.utc(blog.publishedAt).tz('Asia/Tokyo').format('YYYY-MM-DD')}</div>
                                        <div className='font-bold'>{blog.title}</div>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <Pagination totalCount={totalCount} folder={'blog'} per_page={PER_PAGE} />
                    </div>
                </div>
            </div>

            <Footer />
        </div >
    );
}

// 動的なページを作成
export const getStaticPaths = async () => {
    const repos = await client.get({ endpoint: "blog" });

    const range = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i);

    const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map((repo) => `/blog/page/${repo}`);

    return { paths, fallback: false };
};

// データを取得
export const getStaticProps = async (context) => {
    const id = context.params.id;

    const data = await client.get({ endpoint: "blog", queries: { offset: (id - 1) * PER_PAGE, limit: PER_PAGE } });
    data.contents.map(function (item) {
        item.content = item.content.replace(
            /"(https?:\/\/images\.microcms-assets\.io\/.+?\.(jpe?g|gif|png))"/g,
            '"$1?fit=max&w=1024&fm=webp"'
        );
    });

    return {
        props: {
            blog: data.contents,
            totalCount: data.totalCount,
        },
    };
};