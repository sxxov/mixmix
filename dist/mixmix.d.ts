declare type Class = (new (...args: any[]) => any);
export default function mixmix(...classes: Class[]): Class;
export {};
