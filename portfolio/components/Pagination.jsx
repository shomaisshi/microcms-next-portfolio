//components/Pagination.js
import Link from 'next/link';

export const Pagination = ({ totalCount, folder }) => {
    const PER_PAGE = 20;

    const range = (start, end) =>
        [...Array(end - start + 1)].map((_, i) => start + i)

    return (
        <ul className='flex gap-4 mt-4'>
            {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
                <li key={index}>
                    {folder == 'portfolio' ? (
                        <Link href={`/portfolio/page/${number}`} >{number}</Link>
                    ) : (
                        null
                    )}
                    {folder == 'blog' ? (
                        <Link href={`/blog/page/${number}`} >{number}</Link>
                    ) : (
                        null
                    )}
                </li>
            ))}
        </ul>
    );
};