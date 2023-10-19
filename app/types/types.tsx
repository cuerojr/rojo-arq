export interface Image {
    src: string,
    alt: string,
}

export interface ServiceType {
    id: string,
    title: string,
    description: string,
    images: Image[]
}
