import React from 'react';
import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {CustomTablePagination} from './CustomTablePagination';

interface CustomTableConfigProps {
    header: string;
    key: string;
    element?: (item: object) => JSX.Element;
}

interface CustomTableProps {
    config: CustomTableConfigProps[];
    data: {
        total: number;
        lista: object[];
    };
    page: number;
    pageSize: number;
    isFetching: boolean;
    onPageClick: (page: number) => void;
}

export function CustomTable({config, data, page, pageSize, onPageClick, isFetching}: CustomTableProps) {
    const total = data?.total;

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {config?.map((c: any) => (
                        <TableHead key={c.key}>{c.header}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.lista.map((item: any) => (
                    <TableRow key={item.id}>
                        {config.map((c: any) => (
                            <TableCell key={c.key}>
                                {c.element ? React.cloneElement(c.element(item)) : item[c.key]}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>

            <TableFooter>
                <TableRow>
                    <TableCell colSpan={config.length}>
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
    );
}
