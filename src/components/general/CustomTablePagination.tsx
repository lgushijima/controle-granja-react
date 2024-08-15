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
    onPageClick: (page: number) => void;
}

export function CustomTablePagination({page, pageSize, total, onPageClick}: CustomTablePaginationProps) {
    const pages = getPaginationArray(pageSize, page, total, 1);

    const [searchParams, setSearchParams] = useSearchParams();

    const handlePageClick = (page: number) => {
        onPageClick(page);
        setSearchParams(params => {
            params.set('page', String(page));
            return params;
        });
    };

    return (
        <Pagination className=" mx-0 w-auto">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={() => {
                            if (page - 1 > 0) handlePageClick(page - 1);
                        }}
                    />
                </PaginationItem>
                {pages?.map(p => {
                    return (
                        <PaginationItem key={p}>
                            {p >= 1 ? (
                                <PaginationLink
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
                        href="#"
                        onClick={() => {
                            if (page + 1 <= pages[pages.length - 1]) handlePageClick(page + 1);
                        }}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
