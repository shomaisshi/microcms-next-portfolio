import Link from "next/link";
import { client } from "../libs/client";
import Header from '../components/Header'

// dayjs
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function Blog({ blog }) {
  return (
    <div>
      <Header />
      <h1 className="text-xl">＞blog</h1>
      <div className="mt-2 md:flex gap-4 text-xl">
        <div className="leading-relaxed">
          {blog.map((blog) => (
            <div key={blog.id} className="md:mb-10">
              <div className="">{dayjs.utc(blog.publishedAt).tz('Asia/Tokyo').format('YYYY-MM-DD')}</div>
              <div className="mt-2">
                <Link href={`/blog/${blog.id}`} className="text-3xl">{blog.title}</Link>
              </div>
              <div className="mt-6"
                dangerouslySetInnerHTML={{
                  __html: `${blog.content}`,
                }}
              />
            </div>
          ))}
        </div>
        <div>
          <div>最新記事</div>
          {blog.map((blog) => (
            <div key={blog.id}>
              <ul className="pl-6">
                <li className='list-disc'>
                  <Link href={`/blog/${blog.id}`} className="underline">{blog.title}</Link>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blog" });

  return {
    props: {
      blog: data.contents,
    },
  };
};