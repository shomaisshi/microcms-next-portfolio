import { client } from "../../libs/client";

export default function PortfolioId({ portfolio }) {
    return (
        <main>
            <h1>{portfolio.title}</h1>
            <p>{portfolio.publishedAt}</p>
            <div
                dangerouslySetInnerHTML={{
                    __html: `${portfolio.content}`,
                }}
            />
        </main>
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