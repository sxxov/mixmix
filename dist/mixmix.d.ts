declare type Class = (new (...args: any[]) => any);
declare function mixmix<T extends Class>(...classes: Class[]): T;
declare namespace mixmix {
    var constructorIndex: any;
    var options: {
        constructorIndex: number;
        isUsingSameParamsIntoConstructors: boolean;
    };
    var withConstructorAt: <T extends Class>(index?: number, ...classes: Class[]) => T;
    var withSameParamsIntoConstructors: <T extends Class>(...classes: Class[]) => T;
    var withOptions: <T extends Class>(options: {
        constructorIndex: number;
        isUsingSameParamsIntoConstructors: boolean;
    }, ...classes: Class[]) => T;
}
export default mixmix;
