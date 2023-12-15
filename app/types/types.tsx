import { ReactNode } from "react";

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
    subTitle: string;
}

export interface Title {
    preTitle: string;
    title: string;
    backgroundImage?: string;
    titleColor?: string;
}

export interface Props {
    children: ReactNode;
    open?: boolean;
    onClose?: () => void;
    backgroundColor?: string;
}

export interface PlusIcon {
    selectedMision: boolean;
}

export interface ParallaxProps {
    children: string;
    baseVelocity: number;
}