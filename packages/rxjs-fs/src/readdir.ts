import { from, Observable } from 'rxjs';
import { Dirent, promises as fsp } from 'fs';
type Awaited<T> = T extends PromiseLike<infer U> ? U : T
type ReplaceReturnType<T extends (...a: any) => Promise<any>, R extends Awaited<ReturnType<T>> =
    Awaited<ReturnType<T>>> = (...a: Parameters<T>) => Observable<R>;


const readdir: ReplaceReturnType<typeof fsp['readdir']> = (...args: Parameters<typeof fsp['readdir']>): Observable<Dirent[]> => {
    return from(fsp.readdir(...args));
}
export {
    readdir,
}
