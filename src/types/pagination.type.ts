interface Pagination<T> {
    items: T[];
    total: number;
    page: number;
    size: number;
    pages: number;
    links: PaginationLink;
}

interface PaginationLink {
    first: string;
    last: string;
    self: string;
    next: string;
    prev: string;
}

interface PaginationQuery {
    page: number;
    size: number;
}

export type {Pagination, PaginationQuery};
