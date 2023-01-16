import Link from "next/link";
import { client } from "../libs/client";
import Header from '../components/Header'

export default function Portfolio({ portfolio }) {
    return (
        <div>
            <Header />
            <h1 className="text-3xl">works</h1>
            <ul className="text-xl grid gap-4 md:grid-cols-2">
                {portfolio.map((portfolio) => (
                    <li key={portfolio.id}>
                        <Link href={`/portfolio/${portfolio.id}`}>
                            <img src={portfolio.eyecatch.url} alt="アイキャッチ画像" className="" />
                            {portfolio.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
    const data = await client.get({ endpoint: "portfolio" });

    return {
        props: {
            portfolio: data.contents,
        },
    };
};