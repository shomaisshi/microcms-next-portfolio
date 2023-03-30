import Link from "next/link";

export default function Header({ page }) {
    return (
        <>
            <div className="flex justify-between p-2 md:p-8">
                {/* <h1 className="text-3xl"><Link href={"/"} className={page == "about" ? 'underline' : null}>ドーナツハンター</Link></h1> */}
                <h1 className="text-3xl"><Link href={"/"} className={page == "about" ? 'underline' : null}>DonutsHunter</Link></h1>
                <ul className="flex gap-4 text-3xl">
                    <li><Link href={"/blog/page/1"} className={page == "blog" ? 'underline' : null}>blog</Link></li>
                    <li><Link href={"/portfolio/page/1"} className={page == "works" ? 'underline' : null}>works</Link></li>
                </ul>
            </div>
        </>
    )
}