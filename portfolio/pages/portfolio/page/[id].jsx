// pages/portfolio/page/[id].js
import Link from 'next/link';
import { Pagination } from '../../../components/Pagination';
import { client } from "../../../libs/client";
import MyHead from '../../../components/MyHead'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'

const PER_PAGE = 20;

export default function PortfolioPageId({ portfolio, totalCount, currentPage }) {
    return (
        <div>
            <MyHead
                pageTitle={'works'}
                pageDescription={'shomaのworks一覧ページです。'}
                pageImg={'https://microcms-next-portfolio-ebon.vercel.app/OGP.png'}
            />
            <div className=''>
                <Header page={'works'} />

                {/* main */}
                <div className='m-auto md:w-[700px] lg:w-[1000px] p-2 md:p-8'>
                    <div className='md:text-2xl font-bold'>works</div>
                    <ul className='mt-4 grid md:grid-cols-2 lg:grid-cols-3  gap-8 md:text-xl'>
                        {portfolio.map(item => (
                            <li key={item.id} className='w-[300px]'>
                                <Link href={`/portfolio/${item.id}`} className='hover:underline'>
                                    {/* アイキャッチ画像を表示する場合 */}
                                    {item.eyecatch ? (
                                        <img
                                            src={item.eyecatch.url + "?w=324"}
                                            alt="eyecatch"
                                            className="mb-2 aspect-video object-cover rounded"
                                        />
                                    ) : null}
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <Pagination
                        totalCount={totalCount}
                        folder={'portfolio'}
                        per_page={PER_PAGE}
                        currentPage={currentPage} // 現在ページを追加
                    />
                </div>
                <Footer />
            </div>
        </div>
    );
}

// 動的なページを作成
export const getStaticPaths = async () => {
    // 総件数のみ取得（パフォーマンス改善）
    const repos = await client.get({
        endpoint: "portfolio",
        queries: {
            limit: 0  // 件数のみ取得
        }
    });

    const range = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i);
    const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map((repo) => `/portfolio/page/${repo}`);

    return { paths, fallback: false };
};

// データを取得
export const getStaticProps = async (context) => {
    const id = context.params.id;
    const currentPage = parseInt(id); // 現在のページ番号を取得

    const data = await client.get({
        endpoint: "portfolio",
        queries: {
            offset: (id - 1) * PER_PAGE,
            limit: PER_PAGE,
            fields: "id,title,eyecatch" // 必要なフィールドのみ取得
        }
    });

    return {
        props: {
            portfolio: data.contents, // 変数名をportfolioに変更
            totalCount: data.totalCount,
            currentPage: currentPage, // 現在ページを追加
        },
    };
};