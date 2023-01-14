import Link from "next/link";

export default function Header() {
    return (
        <>
            <div>
                <h1><Link href={"/"}>Shoma Kato</Link></h1>
                <ul>
                    <li><Link href={"portfolio"}>ポートフォリオ</Link></li>
                    <li><Link href={"blog"}>ブログ</Link></li>
                </ul>
                <div>--------------------------</div>
            </div>
        </>
    )
}