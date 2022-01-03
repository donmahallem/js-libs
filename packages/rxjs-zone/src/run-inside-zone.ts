/*
 * Package @donmahallem/rxjs-zone
 * Source https://donmahallem.github.io/js-libs/
 */

import { NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import type { MonoTypeOperatorFunction, Subscriber, Subscription } from 'rxjs';

/**
 * Runs the provided observable in the NgZone
 *
 * @param {import('@angular/core').NgZone} zone Zone to run in
 * @returns {import('rxjs').MonoTypeOperatorFunction<T>} passes on data in the zone
 */
export function runInsideZone<T>(zone: NgZone): MonoTypeOperatorFunction<T> {
    return (source: Observable<T>): Observable<T> =>
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
                            observer.next(x);
                        } else {
                            zone.run((): void => {
                                observer.next(x);
                            });
                        }
                    },
                })
        );
}
