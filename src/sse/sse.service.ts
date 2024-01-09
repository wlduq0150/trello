import { Injectable, MessageEvent } from "@nestjs/common";
import { Observable, Subject, filter, map } from "rxjs";

@Injectable()
export class SseService {
    private users$: Subject<any> = new Subject();

    private observer = this.users$.asObservable();

    emitCardChangeEvent(userId: number, message: string) {
        this.users$.next({ id: userId, message: message });
    }

    sendClientAlarm(userId: number): Observable<any> {
        return this.observer.pipe(
            filter((user) => user.id === userId),
            map((user) => {
                return {
                    data: {
                        message: user.message,
                    },
                } as MessageEvent;
            }),
        );
    }
}
