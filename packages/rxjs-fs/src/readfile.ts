import { bindCallback, from, Observable, Subscriber } from 'rxjs';
import { readFile as fsReadFile } from 'fs';
type Awaited<T> = T extends PromiseLike<infer U> ? U : T
type ReplaceReturnType<T extends (...a: any) => Promise<any>, R extends Awaited<ReturnType<T>> =
    Awaited<ReturnType<T>>> = (...a: Parameters<T>) => Observable<R>;
type Ka = (...a: any[]) => any;
type ExtractCallback<T extends Ka> =
    Parameters<T>[1] extends Ka ?
    Parameters<T>[1] :
    Parameters<T>[2] extends Ka ?
    Parameters<T>[2] :
    any;
type ExtractFunctionalParams<T extends Ka> =
    Parameters<T>[1] extends Ka ?
    [Parameters<T>[0]] :
    Parameters<T>[2] extends Ka ?
    [Parameters<T>[0], Parameters<T>[1]] :
    unknown;
type ReplaceReturnType2<T extends (...a: ExtractFunctionalParams<typeof fsReadFile>) => void = any,
    R = Parameters<ExtractCallback<T>>[1]> =
    (...a: Parameters<T>) => Observable<R>;
type ReadFileCallback = Parameters<typeof fsReadFile>[1];
type kk = Parameters<ExtractCallback<typeof fsReadFile>>[1];
const readFile: ReplaceReturnType2 = (...args: ExtractFunctionalParams<typeof fsReadFile>): Observable<Buffer | string> => {
    if (args.length === 1) {
        return new Observable((subscriber) => {
            fsReadFile(args[0], (err: any, data: any): void => {
                if (err) {
                    subscriber.error(err);
                } else {
                    subscriber.next(data);
                    subscriber.complete();
                }
            })
        });
    } else if (args.length === 2) {
        return new Observable((subscriber: Subscriber<string | Buffer>) => {
            fsReadFile(args[0], args[1], (err: any, data: any): void => {
                if (err) {
                    subscriber.error(err);
                } else {
                    subscriber.next(data);
                    subscriber.complete();
                }
            })
        });
    }
    return undefined as any;
}

export {
    readFile,
}
