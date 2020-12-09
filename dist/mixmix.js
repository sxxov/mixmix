(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.mixmix = factory());
}(this, (function () { 'use strict';

    // ['length', 'prototype', 'name']
    // terser discards unused class names, so doing `class X {}`, would become `class {}`
    // in chrome, anonymous classes have the `name` property, but in node they don't
    const BASE_CLASS_PROPERTIES = Object.getOwnPropertyNames(class {
    }).concat('name');
    const BASE_CLASS_PROTOTYPE_PROPERTIES = ['constructor'];
    const BASE_OPTIONS = {
        constructorIndex: null,
        isUsingSameParamsIntoConstructors: null,
    };
    mixmix.constructorIndex = null;
    // todo: use deep copy if using nested objects
    mixmix.options = { ...BASE_OPTIONS };
    mixmix.withConstructorAt = (index = 0, ...classes) => {
        mixmix.options.constructorIndex = index;
        return mixmix(...classes);
    };
    mixmix.withSameParamsIntoConstructors = (...classes) => {
        mixmix.options.isUsingSameParamsIntoConstructors = true;
        return mixmix(...classes);
    };
    // don't use directly,
    // use `withX` methods for now until nested options objects are implemented
    /** @deprecated */
    mixmix.withOptions = (options, ...classes) => {
        mixmix.options = options;
        return mixmix(...classes);
    };
    function mixmix(...classes) {
        let mixedClassClasses = classes;
        const { isUsingSameParamsIntoConstructors, constructorIndex, } = mixmix.options;
        if (constructorIndex != null) {
            mixedClassClasses = [classes[constructorIndex]];
        }
        class MixedClass {
            constructor(...parametersMap) {
                const allClassNames = mixedClassClasses
                    .map((sourceClass) => sourceClass?.name);
                const isIntantiatingAllWithOverrideValue = !!isUsingSameParamsIntoConstructors
                    || constructorIndex != null;
                const parametersClassNames = isIntantiatingAllWithOverrideValue
                    ? allClassNames
                    : Object.keys(parametersMap[0] ?? {});
                // use 'argsKeys' instead of 'className' to invoke in order of keys in 'args'
                for (let i = 0, l = parametersClassNames.length; i < l; ++i) {
                    const parametersClassName = parametersClassNames[i];
                    // if it's using override, then both arrays are the same, so skip the index scan
                    const indexOfParametersClassName = isIntantiatingAllWithOverrideValue
                        ? i
                        : allClassNames.indexOf(parametersClassName);
                    // only invoke constructor if 'parametersClassName' is inside 'parametersMap' as a key
                    if (indexOfParametersClassName === -1) {
                        continue;
                    }
                    // invoke!!!
                    Object
                        .defineProperties(this, Object
                        .getOwnPropertyDescriptors(new mixedClassClasses[indexOfParametersClassName](...(isIntantiatingAllWithOverrideValue
                        // will be array since it's override value
                        ? parametersMap ?? []
                        : parametersMap[0][parametersClassName] ?? []))));
                }
            }
        }
        // reset options (fake instance things)
        mixmix.options = { ...BASE_OPTIONS };
        const mixedClassName = classes
            .map((sourceClass) => sourceClass.name)
            .join('');
        Object.defineProperty(MixedClass, 'name', { value: mixedClassName });
        // clone static items and items in prototype — items to be instantiated
        // (except for constructor, it is handled above)
        for (let i = 0, l = classes.length; i < l; ++i) {
            const sourceClass = classes[i];
            // clone base class & prototype separately to be able to deal with constructor
            defineProperties(MixedClass, sourceClass, BASE_CLASS_PROPERTIES);
            // can happen if mixing instances
            if (sourceClass.prototype) {
                defineProperties(MixedClass.prototype, sourceClass.prototype, BASE_CLASS_PROTOTYPE_PROPERTIES);
            }
        }
        return MixedClass;
    }
    function defineProperties(target, source, excludedNames) {
        const propertyDescriptors = Object.getOwnPropertyDescriptors(source);
        const propertyNames = Object.keys(propertyDescriptors);
        for (let i = 0, l = propertyNames.length; i < l; ++i) {
            const propertyName = propertyNames[i];
            // ensure it is a unique property (not 'length', 'prototype', 'name', 'constructor')
            if (excludedNames.indexOf(propertyName) !== -1) {
                continue;
            }
            // define 'propertyName': 'propertyDescriptors[propertyName]'
            Object.defineProperty(target, propertyName, propertyDescriptors[propertyName]);
        }
    }

    return mixmix;

})));
//# sourceMappingURL=mixmix.js.map
