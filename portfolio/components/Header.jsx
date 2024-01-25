import Link from "next/link";
import Image from 'next/image'

export default function Header({ page }) {
    return (
        <>
            <div className="flex gap-12 justify-between p-2 md:p-8">
                {/* <h1 className="text-3xl"><Link href={"/"} className={page == "about" ? 'underline' : null}>ドーナツハンター</Link></h1> */}
                <h1 className="text-3xl"><Link href={"/"} className={page == "about" ? 'underline' : null}><Image src="/images/donutshunter_dot.png" width={200} height={40} /></Link></h1>
                <ul className="flex gap-4 text-3xl">
                    <li><Link href={"/blog/page/1"} className={page == "blog" ? 'underline' : null}><Image src="/images/blog_dot.png" width={80} height={40} /> </Link></li>
                    <li><Link href={"/portfolio/page/1"} className={page == "works" ? 'underline' : null}><Image src="/images/works_dot.png" width={100} height={40} /></Link></li>
                </ul>
            </div>
        </>
    )
}