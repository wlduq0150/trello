import { Injectable, MessageEvent } from "@nestjs/common";
import { Observable, Subject, filter, map } from "rxjs";

@Injectable()
export class SseService {
    private users$: Subject<any> = new Subject();

    private observer = this.users$.asObservable();

    emitCardChangeEvent(userId: number) {
        this.users$.next({ id: userId });
    }

    sendClientAlarm(userId: number): Observable<any> {
        return this.observer.pipe(
            filter((user) => user.id === userId),
            map((user) => {
                return {
                    data: {
                        message: "카드가 수정되었습니다.",
                    },
                } as MessageEvent;
            }),
        );
    }
}
