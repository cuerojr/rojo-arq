export interface Image {
    src: string;
    alt: string;
}

export interface ServiceType {
    id: string;
    title: string;
    description: string;
    short: string;
    images: Image[];
}

export interface MisionType {
    id: string;    
    title: string;
    description: string;
}