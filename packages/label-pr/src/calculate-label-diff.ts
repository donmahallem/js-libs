export interface ILabelDiff {
    add: string[],
    remove: string[],
    unchanged: string[],
}
export const calculateLabelDiff = (expectedLabels: string[], currentLabels: string[]): ILabelDiff => {
    return {
        add: expectedLabels.filter((label: string): boolean => {
            return currentLabels.indexOf(label) < 0;
        }),
        remove: currentLabels.filter((label: string): boolean => {
            return expectedLabels.indexOf(label) < 0;
        }),
        unchanged: currentLabels.filter((label: string): boolean => {
            return expectedLabels.indexOf(label) >= 0;
        }),
    };

}
