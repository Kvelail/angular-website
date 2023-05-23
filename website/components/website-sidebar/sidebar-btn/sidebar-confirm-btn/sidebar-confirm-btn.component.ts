import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-sidebar-confirm-btn',
    templateUrl: './sidebar-confirm-btn.component.html',
    styleUrls: ['./sidebar-confirm-btn.component.scss'],
})
export class SidebarConfirmBtnComponent implements OnInit {
    @Input() disabledValue?: boolean = false;
    @Input() loginBtn?: boolean = false;
    @Input() displaySpinner?: boolean = false;

    @Output() clickValueEmitter = new EventEmitter<any>();

    constructor() {}

    ngOnInit(): void {}

    public onGetClickValue(): void {
        this.clickValueEmitter.emit({ notDisabledClick: true });
    }
}
