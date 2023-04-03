import { client } from "../../libs/client";
import MyHead from '../../components/MyHead'
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
            <MyHead
                pageTitle={blog.title}
                pageDescription={'shomaのブログです。'}
                pageImg={'https://microcms-next-portfolio-ebon.vercel.app/OGP.png'}
            />
            <Header page={'blog'} />
            <main className="md:text-xl md:w-8/12 p-2 md:p-8" >
                <div className="leading-relaxed">
                    {blog.eyecatch ? <img src={blog.eyecatch.url + "?fit=max&w=1024&fm=webp"} alt="eyecatch" className="aspect-video object-cover w-full" /> : null}
                    <div className="mt-2">{dayjs.utc(blog.publishedAt).tz('Asia/Tokyo').format('YYYY-MM-DD')}</div>
                    <h1 className="mt-2 text-3xl md:text-4xl font-bold">{blog.title}</h1>
                    <div className="mt-6 post"
                        dangerouslySetInnerHTML={{
                            __html: `${blog.content}`,
                        }}
                    />

                    <div className="mt-8">
                        <Link href={"/blog/page/1"} className='underline'>→blog一覧に戻る</Link>
                    </div>
                </div>
            </main>
        </div>
    );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
    const data = await client.get({ endpoint: "blog", queries: { offset: 0, limit: 20 } });

    const paths = data.contents.map((content) => `/blog/${content.id}`);
    return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
    const id = context.params.id;
    const data = await client.get({ endpoint: "blog", contentId: id });
    data.content = data.content.replace(
        /"(https?:\/\/images\.microcms-assets\.io\/.+?\.(jpe?g|gif|png))"/g,
        '"$1?fit=max&w=1024&fm=webp"'
    );

    return {
        props: {
            blog: data,
        },
    };
};