import { client } from "../../libs/client";
import Header from '../../components/Header'

export default function PortfolioId({ portfolio }) {
    return (
        <div>
            <Header />
            <main className="text-xl">
                {portfolio.eyecatch ? <img src={portfolio.eyecatch.url} alt="eyecatch" /> : null}
                <h1 className="text-3xl">{portfolio.title}</h1>
                <p>{portfolio.publishedAt}</p>
                <div className="mt-4"
                    dangerouslySetInnerHTML={{
                        __html: `${portfolio.content}`,
                    }}
                />
            </main>
        </div>
    );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
    const data = await client.get({ endpoint: "portfolio" });

    const paths = data.contents.map((content) => `/portfolio/${content.id}`);
    return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
    const id = context.params.id;
    const data = await client.get({ endpoint: "portfolio", contentId: id });

    return {
        props: {
            portfolio: data,
        },
    };
};