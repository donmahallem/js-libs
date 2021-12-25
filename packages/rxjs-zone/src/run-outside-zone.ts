/*
 * Package @donmahallem/rxjs-zone
 * Source https://donmahallem.github.io/js-libs/
 */

import { NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import type { MonoTypeOperatorFunction, Subscriber, Subscription } from 'rxjs';

export const runOutsideZone: <T>(zone: NgZone) => MonoTypeOperatorFunction<T> =
    <T>(zone: NgZone): MonoTypeOperatorFunction<T> =>
    (source: Observable<T>): Observable<T> =>
        new Observable<T>(
            (observer: Subscriber<T>): Subscription =>
                source.subscribe({
                    complete(): void {
                        observer.complete();
                    },
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    error(err: any): void {
                        observer.error(err);
                    },
                    next(x: T): void {
                        if (NgZone.isInAngularZone()) {
                            zone.runOutsideAngular((): void => {
                                observer.next(x);
                            });
                        } else {
                            observer.next(x);
                        }
                    },
                })
        );
