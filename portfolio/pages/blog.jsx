import Link from "next/link";
import { client } from "../libs/client";
import Header from '../components/Header'

export default function Blog({ blog }) {
  return (
    <div>
      <Header />
      <div className="md:flex gap-4">
        <div className="leading-relaxed">
          {blog.map((blog) => (
            <div key={blog.id} className="mb-20">
              <div className="">{blog.publishedAt}</div>
              <div className="mt-2">
                <Link href={`/blog/${blog.id}`} className="text-3xl font-bold">{blog.title}</Link>
              </div>
              <div className="mt-6"
                dangerouslySetInnerHTML={{
                  __html: `${blog.content}`,
                }}
              />
            </div>
          ))}
        </div>
        <div className="">
          <div>最新記事</div>
          {blog.map((blog) => (
            <div key={blog.id} className="border-solid border-t-2 border-gray-200">
              {/* <div className="">{blog.publishedAt}</div> */}
              <div className="">
                <Link href={`/blog/${blog.id}`} className="text-blue-400">{blog.title}</Link>
              </div>
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