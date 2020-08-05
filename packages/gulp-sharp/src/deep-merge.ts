/*!
 * Source https://github.com/donmahallem/js-libs Package: gulp-sharp
 */

export const deepMerge = (...mergeObjects) => {
    let target = {};
    // Merge the object into the target object
    const innerMerge = (obj) => {
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                if (Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                    // If we're doing a deep merge
                    // and the property is an object
                    target[prop] = innerMerge(target[prop], obj[prop]);
                } else {
                    // Otherwise, do a regular merge
                    target[prop] = obj[prop];
                }
            }
        }
    };
    //Loop through each object and conduct a merge
    for (const mergeObject of mergeObjects) {
        innerMerge(mergeObject);
    }
    return target;
};
