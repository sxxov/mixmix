typeof window!='undefined'&&(window.mixmix=mixmix);typeof exports!='undefined'&&(module.exports=exports.default=mixmix,exports.__esModule={value:!0});typeof define=='function'&&define(()=>{return mixmix});function mixmix(...classes) {
    const processedTargetClass = class MixMixed {
        constructor(args) {
            const classNames = classes
                .map((sourceClass) => Object
                .getOwnPropertyDescriptors(sourceClass)
                .name
                .value);
            const argsKeys = Object.keys(Object(args));
            argsKeys.forEach((argsKey) => {
                if (!classNames.includes(argsKey)) {
                    return;
                }
                Object
                    .defineProperties(this, Object
                    .getOwnPropertyDescriptors(new (classes
                    .filter((sourceClass) => sourceClass.name === argsKey)[0])()));
            });
        }
    };
    classes
        .forEach((sourceClassItem) => {
        defineClassProperties(processedTargetClass, sourceClassItem);
        defineClassProperties(processedTargetClass.prototype, sourceClassItem.prototype);
    });
    return processedTargetClass;
    function defineClassProperties(targetClassItem, sourceClassItem) {
        const propertyNames = Object.getOwnPropertyNames(sourceClassItem);
        const propertyDescriptors = Object.getOwnPropertyDescriptors(sourceClassItem);
        const basePropertyNames = Object.getOwnPropertyNames(class X {
        }).concat(['constructor']);
        const processedTargetClassItem = targetClassItem;
        propertyNames
            .forEach((propertyName) => {
            if (basePropertyNames.includes(propertyName)) {
                return;
            }
            Object.defineProperty(processedTargetClassItem, propertyName, propertyDescriptors[propertyName]);
        });
        return processedTargetClassItem;
    }
}
//# sourceMappingURL=mixmix.js.map