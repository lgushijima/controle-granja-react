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

interface CustomTablePaginationProps {
    page: number;
    pageSize: number;
    total: number;
    onPageClick: (page: number) => void;
}

export function CustomTablePagination({page, pageSize, total, onPageClick}: CustomTablePaginationProps) {
    const pages = getPaginationArray(pageSize, page, total, 1);

    return (
        <Pagination className=" mx-0 w-auto">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={() => {
                            if (page - 1 > 0) onPageClick(page - 1);
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
                                        onPageClick(p);
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
                            if (page + 1 <= pages[pages.length - 1]) onPageClick(page + 1);
                        }}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
