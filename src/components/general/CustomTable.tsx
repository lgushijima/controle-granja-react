import React from 'react';
import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {CustomTablePagination} from './CustomTablePagination';

interface CustomTableConfigProps<T> {
    header: string;
    key: string;
    width?: string;
    element?: (item: T) => JSX.Element;
    format?: (item: T) => string;
}

interface CustomTableProps<T> {
    config: CustomTableConfigProps<T>[];
    data: {
        total: number;
        lista: T[];
    };
    page: number;
    pageSize: number;
    isFetching: boolean;
    onPageClick: (page: number) => void;
}

export function CustomTable<T>({config, data, page, pageSize, onPageClick, isFetching}: CustomTableProps<T>) {
    const total = data?.total;

    return (
        <div className="relative">
            {isFetching && (
                <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                    Loading...
                </div>
            )}
            <Table>
                <TableHeader>
                    <TableRow>
                        {config?.map((c: CustomTableConfigProps<T>) => (
                            <TableHead key={c.key}>{c.header}</TableHead>
                        ))}
                        <TableHead />
                    </TableRow>
                </TableHeader>
                <TableBody className="relative min">
                    {data?.lista.map((item: T, idx: number) => (
                        <TableRow key={idx}>
                            {config.map((c: CustomTableConfigProps<T>) => (
                                <TableCell key={c.key} width={c.width}>
                                    {c.element
                                        ? React.cloneElement(c.element(item))
                                        : c.format
                                        ? c.format(item)
                                        : (item as any)[c.key]}
                                </TableCell>
                            ))}
                            <TableCell />
                        </TableRow>
                    ))}
                </TableBody>

                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={config.length + 1}>
                            <div className="flex items-center justify-between">
                                <CustomTablePagination
                                    page={page}
                                    pageSize={pageSize}
                                    total={total}
                                    onPageClick={onPageClick}
                                />

                                <div className="flex mx-0 whitespace-nowrap text-gray-500">
                                    Página {page} de {Math.ceil(total / pageSize)} | Total de registros: {total}
                                </div>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
}
