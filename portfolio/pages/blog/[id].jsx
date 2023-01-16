import { client } from "../../libs/client";
import Header from '../../components/Header'
import Link from "next/link";

// dayjs
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function BlogId({ blog }) {
    return (
        <div>
            <Header />
            <main className="text-xl md:w-8/12">
                <p>{dayjs.utc(blog.publishedAt).tz('Asia/Tokyo').format('YYYY-MM-DD')}</p>
                <h1 className="text-3xl">{blog.title}</h1>
                <div className="mt-4"
                    dangerouslySetInnerHTML={{
                        __html: `${blog.content}`,
                    }}
                />

                <div className="mt-8">
                    <Link href={"/blog/page/1"} className='underline'>→blog一覧に戻る</Link>
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