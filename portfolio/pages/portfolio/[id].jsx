import { client } from "../../libs/client";
import MyHead from '../../components/MyHead'
import Header from '../../components/Header'
import Link from "next/link";

export default function PortfolioId({ portfolio }) {
    return (
        <div>
            <MyHead
                pageTitle={portfolio.title}
                pageDescription={'shomaのworksです。'}
                pageImg={'https://microcms-next-portfolio-ebon.vercel.app/OGP.png'}
            />
            <Header page={'works'} />
            <main className="md:text-xl md:w-8/12 p-2 md:p-8">
                {portfolio.eyecatch ? <img src={portfolio.eyecatch.url + "?fit=max&w=1024&fm=webp"} alt="eyecatch" /> : null}
                <h1 className="text-3xl md:text-4xl mt-8">{portfolio.title}</h1>
                <div className="mt-8 post"
                    dangerouslySetInnerHTML={{
                        __html: `${portfolio.content}`,
                    }}
                />

                <div className="mt-8">
                    <Link href={"/portfolio/page/1"} className='underline'>→works一覧に戻る</Link>
                </div>
            </main>
        </div>
    );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
    const data = await client.get({ endpoint: "portfolio", queries: { offset: 0, limit: 20 } });

    const paths = data.contents.map((content) => `/portfolio/${content.id}`);
    return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
    const id = context.params.id;
    const data = await client.get({ endpoint: "portfolio", contentId: id });
    data.content = data.content.replace(
        /"(https?:\/\/images\.microcms-assets\.io\/.+?\.(jpe?g|gif|png))"/g,
        '"$1?fit=max&w=400&fm=webp"'
    );

    return {
        props: {
            portfolio: data,
        },
    };
};