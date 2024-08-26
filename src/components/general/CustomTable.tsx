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
    data?: {
        total: number;
        lista: T[];
    };
    page: number;
    pageSize: number;
    isFetching: boolean;
}

export function CustomTable<T>({config, data, page, pageSize, isFetching}: CustomTableProps<T>) {
    const total = data?.total;

    return (
        <div className="relative h-full">
            {<div className={`table-loading ${isFetching ? 'active' : ''}`}>Carregando dados...</div>}
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent">
                        {config?.map((c: CustomTableConfigProps<T>) => (
                            <TableHead key={c.key}>{c.header}</TableHead>
                        ))}
                        <TableHead />
                    </TableRow>
                </TableHeader>
                <TableBody className="relative min">
                    {data?.lista.map((item: T, idx: number) => (
                        <TableRow key={idx} style={{height: '1px'}}>
                            {config.map((c: CustomTableConfigProps<T>) => (
                                <TableCell key={c.key} width={c.width}>
                                    {c.element ? c.element(item) : c.format ? c.format(item) : (item as any)[c.key]}
                                </TableCell>
                            ))}
                            <TableCell />
                        </TableRow>
                    ))}
                    <TableRow></TableRow>
                </TableBody>

                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={config.length + 1}>
                            <div className="flex items-center justify-between">
                                <CustomTablePagination page={page} pageSize={pageSize} total={total || 0} />

                                <div className="flex mx-0 whitespace-nowrap text-gray-500">
                                    Página {page} de {Math.ceil(total || 0 / pageSize)} | Total de registros: {total || 0}
                                </div>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
}
