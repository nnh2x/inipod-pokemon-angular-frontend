import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    signal,
    TemplateRef,
} from '@angular/core';
import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { Header } from '../share/IResponseApi.interface';
const modules = [
    FormsModule,
    NzButtonModule,
    NzDropDownModule,
    NzIconModule,
    NzInputModule,
    NzTableModule,
    NzIconModule,
    NzSpinModule,
    NzAlertModule,
    NzTagModule,
];
@Component({
    selector: 'app-table',
    standalone: true,
    imports: [CommonModule, ...modules],
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<RecordType extends Record<string, any>, IdType>
    implements OnInit
{
    @Input() columns: Header<RecordType>[] = [];
    @Input() record: RecordType[] = [];
    @Input() rowsPerPage = 5;
    @Input() selectCheckbox = true;
    @Input() isLoading = false;
    @Input() selected = signal<string[]>([]);
    @Input() nzTotal = 0;
    @Input() keySelect: string | null = null;
    @Input() lengthIsSelected: boolean = false;
    @Input() checked = false;
    @Input() heightTable = '500px';

    setOfCheckedId = new Set<number>();

    @Output() pageChange = new EventEmitter<number>();
    @Output() pageSizeChange = new EventEmitter<number>();
    @Output() setIsSelects = new EventEmitter<[]>();
    @Output() tableQueryParamsChange = new EventEmitter<NzTableQueryParams>();
    @Output() actionChange = new EventEmitter<RecordType>();

    indeterminate = false;
    currentPage = 1;

    onPageIndexChange(page: number): void {
        this.pageChange.emit(page);
    }

    onPageSizeChange(size: number): void {
        this.pageSizeChange.emit(size);
    }

    ngOnInit(): void {}

    visible = false;
    reset(): void {
        this.search();
    }

    search(): void {}

    isChecked(id: any): boolean {
        const isSelected = this.selected().some(
            (item: string) => item === id.id
        );
        return isSelected;
    }

    updateCheckedSet(id: number, checked: boolean): void {
        if (checked) {
            this.setOfCheckedId.add(id);
        } else {
            this.setOfCheckedId.delete(id);
        }
        this.setIsSelects.emit(
            Array.from(this.setOfCheckedId).map((e) => e) as []
        );
    }
    refreshCheckedStatus(): void {
        const listOfEnabledData = this.record;
        this.checked = listOfEnabledData.every(({ id }) =>
            this.setOfCheckedId.has(id)
        );
        this.indeterminate =
            listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) &&
            !this.checked;
    }

    onAllChecked(checked: boolean): void {
        this.record.forEach(({ id }) => this.updateCheckedSet(id, checked));
        this.refreshCheckedStatus();
        return this.setIsSelects.emit(
            Array.from(this.setOfCheckedId).map((e) => e) as []
        );
    }

    onQueryParamsChange(params: NzTableQueryParams): void {
        this.tableQueryParamsChange.emit(params);
    }

    actionClick(event: RecordType): void {
        this.actionChange.emit(event);
    }

    logId(event: Event): void {
        console.log(event);
    }
}
