var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function mixmix() {
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
                var classPropertyDescriptors = Object
                    .getOwnPropertyDescriptors(new (classes
                    .filter(function (sourceClass) { return sourceClass.name === argsKey; })[0])());
                var classPropertyDescriptorsKeys = Object.keys(classPropertyDescriptors);
                var classPropertyDescriptorsValues = Object.values(classPropertyDescriptors);
                var enumerableClassPropertyDescriptors = (function () {
                    var workingObject = {};
                    classPropertyDescriptorsKeys.forEach(function (classPropertyDescriptorsKey, i) {
                        workingObject[classPropertyDescriptorsKey] = __assign(__assign({}, classPropertyDescriptorsValues[i]), { enumerable: true });
                    });
                    return workingObject;
                })();
                Object
                    .defineProperties(_this, enumerableClassPropertyDescriptors);
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
            Object.defineProperty(processedTargetClassItem, propertyName, __assign(__assign({}, propertyDescriptors[propertyName]), { enumerable: true }));
        });
        return processedTargetClassItem;
    }
}
//# sourceMappingURL=mixmix.js.map