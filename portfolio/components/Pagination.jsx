//components/Pagination.js
import Link from 'next/link';

export const Pagination = ({ totalCount, folder, per_page, currentPage = 1 }) => {
    const PER_PAGE = per_page;
    const range = (start, end) =>
        [...Array(end - start + 1)].map((_, i) => start + i);

    return (
        <ul className='flex gap-2 mt-12 justify-center'>
            {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
                <li key={index} className='text-lg'>
                    {folder == 'portfolio' ? (
                        <Link
                            className={`p-4 rounded-md transition-colors ${number === currentPage
                                ? 'bg-slate-400 text-white font-bold'
                                : 'hover:bg-gray-200'
                                }`}
                            href={`/portfolio/page/${number}`}
                        >
                            {number}
                        </Link>
                    ) : null}

                    {folder == 'blog' ? (
                        <Link
                            className={`p-4 rounded-md transition-colors ${number === currentPage
                                ? 'bg-slate-400 text-white font-bold'
                                : 'hover:bg-gray-200'
                                }`}
                            href={`/blog/page/${number}`}
                        >
                            {number}
                        </Link>
                    ) : null}
                </li>
            ))}
        </ul>
    );
};