declare type ClassItem = (new (...args: any[]) => any);
declare module 'mixmix';
declare function mixmix(...classes: ClassItem[]): ClassItem;
