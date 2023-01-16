import { client } from "../../libs/client";
import Header from '../../components/Header'
import Link from "next/link";

export default function BlogId({ blog }) {
    return (
        <div>
            <Header />
            <main>
                <p>{blog.publishedAt}</p>
                <h1 className="text-3xl">{blog.title}</h1>
                <div className="mt-4"
                    dangerouslySetInnerHTML={{
                        __html: `${blog.content}`,
                    }}
                />

                <div>
                    <Link href={"/blog"} className='underline'>→blog一覧に戻る</Link>
                </div>
            </main>
        </div>
    );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
    const data = await client.get({ endpoint: "blog" });

    const paths = data.contents.map((content) => `/blog/${content.id}`);
    return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
    const id = context.params.id;
    const data = await client.get({ endpoint: "blog", contentId: id });

    return {
        props: {
            blog: data,
        },
    };
};