import Link from "next/link";

export default function Header() {
    return (
        <>
            <div className="flex justify-between mb-4">
                <h1 className="text-3xl"><Link href={"/"}>shoma</Link></h1>
                <ul className="flex gap-4 text-3xl">
                    <li><Link href={"/blog"}>blog</Link></li>
                    <li><Link href={"/portfolio"}>works</Link></li>
                </ul>
            </div>
        </>
    )
}