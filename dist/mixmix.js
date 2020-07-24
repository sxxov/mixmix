typeof window!='undefined'&&(window.mixmix=mixmix);typeof exports!='undefined'&&(module.exports=exports.default=mixmix,exports.__esModule={value:!0});typeof define=='function'&&define(()=>{return mixmix});function mixmix() {
    var classes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classes[_i] = arguments[_i];
    }
    var processedTargetClass = (function () {
        function MixMixed(args) {
            var _this = this;
            var classNames = classes
                .map(function (sourceClass) { return Object
                .getOwnPropertyDescriptors(sourceClass)
                .name
                .value; });
            var argsKeys = (function () {
                var keys = Object.keys(Object(args));
                if (keys.length === 0) {
                    return classNames;
                }
                return keys;
            })();
            argsKeys.forEach(function (argsKey) {
                if (!classNames.includes(argsKey)) {
                    return;
                }
                Object
                    .defineProperties(_this, Object
                    .getOwnPropertyDescriptors(new (classes
                    .filter(function (sourceClass) { return sourceClass.name === argsKey; })[0])()));
            });
        }
        return MixMixed;
    }());
    classes
        .forEach(function (sourceClassItem) {
        defineClassProperties(processedTargetClass, sourceClassItem);
        defineClassProperties(processedTargetClass.prototype, sourceClassItem.prototype);
    });
    return processedTargetClass;
    function defineClassProperties(targetClassItem, sourceClassItem) {
        var propertyNames = Object.getOwnPropertyNames(sourceClassItem);
        var propertyDescriptors = Object.getOwnPropertyDescriptors(sourceClassItem);
        var basePropertyNames = Object.getOwnPropertyNames((function () {
            function X() {
            }
            return X;
        }())).concat(['constructor']);
        var processedTargetClassItem = targetClassItem;
        propertyNames
            .forEach(function (propertyName) {
            if (basePropertyNames.includes(propertyName)) {
                return;
            }
            Object.defineProperty(processedTargetClassItem, propertyName, propertyDescriptors[propertyName]);
        });
        return processedTargetClassItem;
    }
}
//# sourceMappingURL=mixmix.js.map