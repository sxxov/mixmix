declare type Class = (new (...args: any[]) => any);
declare function mixmix(...classes: Class[]): Class;
declare namespace mixmix {
    var constructorIndex: any;
    var options: {
        constructorIndex: number;
        isUsingSameParamsIntoConstructors: boolean;
    };
    var withConstructorAt: (index?: number, ...classes: Class[]) => Class;
    var withSameParamsIntoConstructors: (...classes: Class[]) => Class;
    var withOptions: (options: {
        constructorIndex: number;
        isUsingSameParamsIntoConstructors: boolean;
    }, ...classes: Class[]) => Class;
}
export default mixmix;
