import Link from "next/link";
import { client } from "../libs/client";
import Header from '../components/Header'

export default function Portfolio({ portfolio }) {
    return (
        <div>
            <Header />
            <ul>
                {portfolio.map((portfolio) => (
                    <li key={portfolio.id}>
                        <Link href={`/portfolio/${portfolio.id}`}>{portfolio.title}</Link>
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