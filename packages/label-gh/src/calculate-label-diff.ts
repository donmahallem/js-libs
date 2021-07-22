/*
 * Package @donmahallem/label-gh
 * Source https://donmahallem.github.io/js-libs/
 */

export interface ILabelDiff {
    add: string[];
    remove: string[];
    unchanged: string[];
}
export const calculateLabelDiff = (expectedLabels: string[], currentLabels: string[]): ILabelDiff => ({
    add: expectedLabels.filter((label: string): boolean => currentLabels.indexOf(label) < 0),
    remove: currentLabels.filter((label: string): boolean => expectedLabels.indexOf(label) < 0),
    unchanged: currentLabels.filter((label: string): boolean => expectedLabels.indexOf(label) >= 0),
});
