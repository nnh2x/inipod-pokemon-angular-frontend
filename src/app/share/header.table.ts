export interface Header<T> {
    field: string;
    header: string;
    width?: string;
    search?: boolean;
    sort?: boolean;
    color?: string;
    optional?: (value: string) => string;
    tab?: (value: string) => TypeTag;
    event?: (value: T) => void;
    icon?: string;
}

export interface TypeTag {
    color: string;
    label: string;
}
