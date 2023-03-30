// pages/blog/page/[id].js
import Link from 'next/link';
import { Pagination } from '../../../components/Pagination';
import { client } from "../../../libs/client";
import MyHead from '../../../components/MyHead'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'

const PER_PAGE = 5;

// pages/blog/[id].js
export default function BlogPageId({ blog, totalCount }) {
    return (
        <div>
            <MyHead
                pageTitle={'works'}
                pageDescription={'shomaのworks一覧ページです。'}
                pageImg={'https://microcms-next-portfolio-ebon.vercel.app/OGP.png'}
            />
            <Header page={'works'} />
            <div className='p-2 md:p-8'>
                <div className='md:text-2xl font-bold'>works</div>
                <ul className='mt-4 grid gap-2 md:text-xl'>
                    {blog.map(blog => (
                        <li key={blog.id}>
                            <Link href={`/portfolio/${blog.id}`} className='hover:underline'>
                                {/* {blog.eyecatch ? <img src={blog.eyecatch.url + "?w=324"} alt="eyecatch" /> : null} */}
                                {blog.title}
                            </Link>
                        </li>
                    ))}
                </ul>
                <Pagination totalCount={totalCount} folder={'portfolio'} />
            </div>
            <Footer />
        </div>
    );
}

// 動的なページを作成
export const getStaticPaths = async () => {
    const repos = await client.get({ endpoint: "portfolio" });

    const range = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i);

    const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map((repo) => `/portfolio/page/${repo}`);

    return { paths, fallback: false };
};

// データを取得
export const getStaticProps = async (context) => {
    const id = context.params.id;

    const data = await client.get({ endpoint: "portfolio", queries: { offset: (id - 1) * 5, limit: 5 } });

    return {
        props: {
            blog: data.contents,
            totalCount: data.totalCount,
        },
    };
};