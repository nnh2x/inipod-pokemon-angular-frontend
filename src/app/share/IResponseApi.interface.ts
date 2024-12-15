export interface Header<T> {
    field: string;
    header: string;
    width?: string;
    search?: boolean;
    sort?: boolean;
    color?: string;
    optional?: (value: string) => string;
    tab?: (value: string) => TypeTap;
    event?: (value : T) => void;
    icon? : string;
}

export interface IResponse<T> {
    data: T[];
    page: Page;
}

export interface Page {
    total: number;
    lastPage: number;
    currentPage: number;
    totalPerPage: number;
    prevPage: number | null;
    nextPage: number;
}

export interface TypeTap {
    color: string;
    label: string;
}

export interface IResponseApi<T> {
    message: string;
    status: any;
    statusCode: number;
    data: T;
}
