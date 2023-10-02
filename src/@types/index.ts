
declare module "*.jpg" {
    import { Image } from "canvas";
    export const format = ".jpg";
    export const image: ImageType & Image;
}
declare module "*.png" {
    import { Image } from "canvas";
    export const format = ".png";
    export const image: ImageType & Image;
}
declare module "*.jpeg" {
    import { Image } from "canvas";
    export const format = ".jpeg";
    export const image: ImageType & Image;
}
declare module "*.webp" {
    import { Image } from "canvas";
    export const format = ".webp";
    export const image: ImageType & Image;
}

type ImageType = string | File | HTMLImageElement | Blob | CanvasRenderingContext2D | ImageData;