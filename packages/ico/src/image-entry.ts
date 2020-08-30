export enum ImageType {
    PNG = 'png',
    BMP = 'bmp',
}
export interface IImageEntry {
    height: number;
    width: number;
    data: Buffer;
    type: ImageType;
}
