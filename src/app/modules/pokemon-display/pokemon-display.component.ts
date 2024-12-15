import { Component, inject } from '@angular/core';
import { providerPokemonDisplayService } from './service/pokemo-display.service';
import { PokemonDisplayStore } from './service/pokemo-display.store';
import { Pokemon } from '../hompage/service/homepage.type';
import { Header, TypeTap } from '../../share/IResponseApi.interface';
import { TableComponent } from '../../table/table.component';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

import { NzSelectModule } from 'ng-zorro-antd/select';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CommonModule } from '@angular/common';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { Router } from '@angular/router';
import * as Papa from 'papaparse';
import { NzSpinModule } from 'ng-zorro-antd/spin';
@Component({
    selector: 'app-pokemon-display',
    standalone: true,
    imports: [
        TableComponent,
        NzInputModule,
        FormsModule,
        NzButtonModule,
        NzInputModule,
        NzIconModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        NzSelectModule,
        NzSliderModule,
        NzSpinModule
    ],

    templateUrl: './pokemon-display.component.html',
    styleUrl: './pokemon-display.component.scss',
    providers: [providerPokemonDisplayService(), PokemonDisplayStore],
})
export class PokemonDisplayComponent {
    protected store = inject(PokemonDisplayStore);
    protected router = inject(Router);
    disabled = false;
    value1 = 1000;
    selectedValue = null;
    ngOnInit(): void {
        this.store.listPokemon(this.store.params);
        this.store.typesPokemon();
    }

    protected readonly search = new FormGroup({
        name: new FormControl(''),
        type1: new FormControl(''),
    });

    protected readonly columns: Header<Pokemon>[] = [
        {
            field: 'name',
            header: 'Name',
            search: true,
            sort: true,
            width: '250px',
            event: (data) => this.getDetail(data),
        },
        {
            field: 'type1',
            header: 'Type1',
            search: true,
            sort: true,
            width: '300px',
        },
        {
            field: 'type2',
            header: 'type2',
            search: false,
            sort: false,
            width: '300px',
        },
        {
            field: 'total',
            header: 'total',
            search: true,
            sort: true,
            width: '300px',
            tab: (status: string) => this.optionalTotalTab(status),
        },
        {
            field: 'hp',
            header: 'hp',
            search: false,
            color: 'text-red-600',
            sort: true,
            width: '300px',
            tab: (status: string) => this.optionalTab(status),
        },
        {
            field: 'attack',
            header: 'attack',
            search: false,
            sort: true,
            width: '300px',
        },
        {
            field: 'defense',
            header: 'defense',
            search: false,
            sort: true,
            width: '300px',
        },
        {
            field: 'spAttack',
            header: 'spAttack',
            search: false,
            sort: true,
            width: '300px',
        },
        {
            field: 'spDefense',
            header: 'spDefense',
            search: false,
            sort: true,
            width: '300px',
        },
        {
            field: 'speed',
            header: 'speed',
            search: false,
            sort: true,
            width: '300px',
        },
        {
            field: 'generation',
            header: 'generation',
            search: false,
            sort: false,
            width: '300px',
        },
        {
            field: 'legendary',
            header: 'legendary',
            search: false,
            sort: false,
            width: '300px',
        },
    ];

    optionalTab(tab: string): TypeTap {
        if (!isNaN(Number(tab)) && Number(tab) < 300) {
            return {
                color: 'blue',
                label: 'success',
            };
        } else if (!isNaN(Number(tab)) && Number(tab) > 300) {
            return {
                color: 'red',
                label: 'success',
            };
        } else {
            return {
                color: 'black',
                label: 'default',
            };
        }
    }

    optionalTotalTab(tab: string): TypeTap {
        if (!isNaN(Number(tab)) && Number(tab) < 300) {
            return {
                color: 'blue',
                label: 'success',
            };
        } else if (!isNaN(Number(tab)) && Number(tab) > 300) {
            return {
                color: 'red',
                label: 'success',
            };
        } else {
            return {
                color: 'black',
                label: 'default',
            };
        }
    }

    handlePageIndexChange(currentPageIndex: number): void {
        this.store.updateParamsPage(currentPageIndex);
    }

    handlePageSizeChange(size: number): void {
        this.store.updateParamsSizePage(size);
    }

    tableQueryParamsChange(pr: NzTableQueryParams) {
        const sorts = JSON.stringify(
            pr.sort
                .filter((sr) => sr.value !== null)
                .map((data) => {
                    const key = data.key;
                    const value = data.value === 'ascend' ? 'ASC' : 'DESC';
                    return {
                        [key]: value,
                    };
                })
        );
        this.store.updateParamsSortsPage(sorts);
    }

    filterPokemon() {
        const dataForm = JSON.stringify(this.search.value);
        this.store.updateParamsSearchPage(dataForm);
    }

    getDetail(data: Pokemon) {
        this.router.navigate(['/pokemon', data.id]);
    }

    onFileSelected(event: any): void {
        const file: File = event.target.files[0];
        this.store.import(file);
    }
}
