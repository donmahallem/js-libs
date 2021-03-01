import { Changelog, ChangelogItem, GistGetResponseData, SyncType } from "./types";

export const calculateDiff = (state: GistGetResponseData, changes: any): Changelog => {
    const stateKeys: string[] = Object.keys(state);
    const changeKeys: string[] = Object.keys(changes);
    const mergedKeys: string[] = [...new Set(...stateKeys, ...changeKeys)];
    const difference: ChangelogItem[] = [];
    for (let key of mergedKeys) {
        if (key in changes) {
            // Update or Creation
            difference.push({
                data: changes[key],
                type: (key in state) ? SyncType.UPDATE : SyncType.CREATE,
            });
        } else if (key in state && !(key in changes)) {
            // Deletion
            difference.push({
                filename: key,
                type: SyncType.DELETE,
            });
        } else {
            throw new Error('Error in diff calculation');
        }
    }
    return difference;
}
