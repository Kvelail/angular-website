import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    OnChanges,
    SimpleChanges,
} from '@angular/core';

import { fadeInAnimation } from '../../../../state/utils/animation';

@Component({
    selector: 'app-sidebar-resend-btn',
    templateUrl: './sidebar-resend-btn.component.html',
    styleUrls: ['./sidebar-resend-btn.component.scss'],
    animations: [fadeInAnimation()],
})
export class SidebarResendBtnComponent implements OnInit, OnChanges {
    @Input() btnText: string = null;
    @Input() requestedResend?: boolean = false;

    @Output() clickValueEmitter = new EventEmitter<any>();
    @Output() resetRequestedResendEmitter = new EventEmitter<any>();

    public sentAgoCounter: number = 0;

    public sentAgoBtnDisabled: boolean = false;

    constructor() {}

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.requestedResend?.currentValue) {
            this.startSentAgoCounter();
        }
    }

    public onGetClickValue(): void {
        if (this.sentAgoBtnDisabled) {
            return;
        }

        this.clickValueEmitter.emit({ notDisabledClick: true });

        this.sentAgoBtnDisabled = true;
    }

    private startSentAgoCounter(): void {
        let counter = 0;

        const sentAgoInterval = setInterval(() => {
            counter++;

            if (counter === 60) {
                this.sentAgoCounter++;

                counter = 0;

                if (this.sentAgoCounter % 5 === 0) {
                    this.sentAgoBtnDisabled = false;

                    this.resetRequestedResendEmitter.emit(true);

                    this.sentAgoCounter = 0;

                    clearInterval(sentAgoInterval);
                }
            }

            if (this.sentAgoCounter === 30) {
                clearInterval(sentAgoInterval);
            }
        }, 1000);
    }
}
