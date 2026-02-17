import Image from 'next/image'

export function MyGame({ title, imagelink, description, url }) {
    return (
        <>
            <div className='pb-4 flex flex-col'>
                <Image
                    src={imagelink}
                    alt="プロフィール画像"
                    width={300}
                    height={300}
                    className='rounded-lg w-full'
                />
                <h3 className='mt-2 text-xl'>{title}</h3>
                <p className='mt-2 pb-4 text-base'>{description}</p>
                <p className='mt-auto'><a href={url} target="_blank" rel="noopener noreferrer" className='bg-slate-300 rounded-sm p-2 text-base'>ブラウザで遊ぶ</a></p>
            </div>
        </>
    )
}

export default function GameGallery() {
    return (
        <>

            <div className='w-[300px] mt-8'>
                <h2 className='text-3xl'>Release games</h2>
                <div className='mt-4'>
                    <Image
                        src="/images/MotionRec_keyart.png"
                        alt="プロフィール画像"
                        width={300}
                        height={300}
                        className='rounded-lg'
                    />
                    <h3 className='mt-2 text-2xl'>MotionRec</h3>
                    <p className='mt-2 text-base'>動きを記録し、再生して進む“レコードパズルアクション”</p>
                    <p className='mt-4'><a href="https://store.steampowered.com/app/2602230/MotionRec/" target="_blank" rel="noopener noreferrer" className='bg-slate-300 p-2 rounded-sm'>Steamページへ</a></p>
                </div>
            </div>

            <h2 className='text-3xl mt-16'>Tiny games</h2>
            <div className='mt-4 grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-6'>
                <MyGame
                    title="ビルの管理人"
                    imagelink="/images/bill_sokoban.png"
                    description="レトロなビルに清掃のお手伝いに行くことになりました。部屋を片付けよう。"
                    url="https://shomaisshi.github.io/my_games/bill_sokoban/"
                />
                <MyGame
                    title="MOTIONREC（PICO-8 ver）"
                    imagelink="/images/motionrec.gif"
                    description="「動きを記録して再生する」というコンセプトのアクションパズル​"
                    url="https://www.lexaloffle.com/bbs/?pid=131910#p"
                />
                <MyGame
                    title="クラゲガイド"
                    imagelink="/images/firesidejam.png"
                    description="クラゲの群れを案内してゴールまで連れて行こう"
                    url="https://shomaisshi.github.io/my_games/firesidejam/"
                />
                <MyGame
                    title="行列のできるクスリ屋"
                    imagelink="/images/clickerjam.gif"
                    description="勇者に薬草を売ってお金を稼ごう。魔物を育てて勇者の来店率UP"
                    url="https://shomaisshi.github.io/my_games/clickerjam/"
                />
                <MyGame
                    title="リリースノート"
                    imagelink="/images/brackeysjam.gif"
                    description="ブロック崩しをクリアするごとにアップデートが入り仕様が変わっていく"
                    url="https://shomaisshi.github.io/my_games/brackeysjam/"
                />
                <MyGame
                    title="Pick Up バレット"
                    imagelink="/images/juicejam_title.gif"
                    description="弾を拾いながら進むシューティングゲーム"
                    url="https://shomaisshi.github.io/my_games/juicejam2/"
                />
                <MyGame
                    title="Re:ドリーム"
                    imagelink="/images/lsdjam.gif"
                    description="夢ではよく会う人がいてよくいく町がありよく死ぬ場所がある。そして朝起きる。"
                    url="https://shomaisshi.github.io/my_games/lsdjam/"
                />
            </div>
        </>
    )
}