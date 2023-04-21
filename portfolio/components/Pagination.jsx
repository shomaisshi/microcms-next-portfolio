//components/Pagination.js
import Link from 'next/link';

export const Pagination = ({ totalCount, folder, per_page }) => {
    const PER_PAGE = per_page;

    const range = (start, end) =>
        [...Array(end - start + 1)].map((_, i) => start + i)

    return (
        <ul className='flex gap-2 mt-12'>
            {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
                <li key={index} className='text-lg'>
                    {folder == 'portfolio' ? (
                        <Link className='hover:bg-gray-200 p-4 rounded-md' href={`/portfolio/page/${number}`} >{number}</Link>
                    ) : (
                        null
                    )}
                    {folder == 'blog' ? (
                        <Link className='hover:bg-gray-200 p-4 rounded-md' href={`/blog/page/${number}`} >{number}</Link>
                    ) : (
                        null
                    )}
                </li>
            ))}
        </ul>
    );
};