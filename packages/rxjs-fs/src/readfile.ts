import { from, Observable } from 'rxjs';
import { promises as fsp } from 'fs';
type Awaited<T> = T extends PromiseLike<infer U> ? U : T
type ReplaceReturnType<T extends (...a: any) => Promise<any>, R extends Awaited<ReturnType<T>> =
    Awaited<ReturnType<T>>> = (...a: Parameters<T>) => Observable<R>;

const readFile: ReplaceReturnType<typeof fsp['readFile']> = (...args: Parameters<typeof fsp['readFile']>): Observable<Buffer | string> => {
    return from(fsp.readFile(...args));
}

export {
    readFile,
}
