import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import {getPaginationArray} from '@/lib/utils';
import {useSearchParams} from 'react-router-dom';

interface CustomTablePaginationProps {
    page: number;
    pageSize: number;
    total: number;
}

export function CustomTablePagination({page, pageSize, total}: CustomTablePaginationProps) {
    const pages = getPaginationArray(pageSize, page, total, 1);

    const [_, setSearchParams] = useSearchParams();

    const handlePageClick = (page: number) => {
        setSearchParams(params => {
            params.set('p', String(page));
            return params;
        });
    };

    const hasPrev = page - 1 > 0;
    const hasNext = page + 1 <= pages[pages.length - 1];

    return (
        <Pagination className=" mx-0 w-auto">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        className={`btn btn-secondary-link ${!hasPrev ? 'disabled' : ''}`}
                        href="#"
                        onClick={() => {
                            if (hasPrev) handlePageClick(page - 1);
                        }}
                    />
                </PaginationItem>
                {pages?.map(p => {
                    return (
                        <PaginationItem key={p}>
                            {p >= 1 ? (
                                <PaginationLink
                                    className={`btn btn-secondary-outline ${p == page ? 'active' : ''}`}
                                    isActive={p == page}
                                    href="#"
                                    onClick={() => {
                                        handlePageClick(p);
                                    }}>
                                    {p}
                                </PaginationLink>
                            ) : (
                                <PaginationEllipsis />
                            )}
                        </PaginationItem>
                    );
                })}
                <PaginationItem>
                    <PaginationNext
                        className={`btn btn-secondary-link ${!hasNext ? 'disabled' : ''}`}
                        href="#"
                        onClick={() => {
                            if (hasNext) handlePageClick(page + 1);
                        }}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
