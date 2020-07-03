declare type ClassItem = (new (...args: any[]) => any);
declare function mixmix(...classes: ClassItem[]): ClassItem;
declare module 'mixmix';
