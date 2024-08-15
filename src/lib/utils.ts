import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getPaginationArray(pageSize: number, page: number, total: number, pageRange: number) {
    const totalPages = Math.ceil(total / pageSize);
    const pages = [];

    pages.push(1);

    const startPage = Math.max(2, page - pageRange);
    const endPage = Math.min(totalPages - 1, page + pageRange);

    if (startPage > 2) {
        pages.push(0);
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    if (endPage < totalPages - 1) {
        pages.push(0);
    }

    if (totalPages > 1) {
        pages.push(totalPages);
    }

    return pages;
}

export function objectToQueryString(obj: Record<string, any>): string {
    const params = new URLSearchParams();

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (Array.isArray(value)) {
                value.forEach(val => params.append(key, val));
            } else if (value !== undefined && value !== null) {
                params.append(key, value.toString());
            }
        }
    }

    return params.toString();
}
