import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { TableCellAppCfOrgSpaceBase } from '../TableCellAppCfOrgSpaceBase';
import { CFAppState } from './../../../../../../../../store/src/app-state';

@Component({
  selector: 'app-table-cell-app-cforgspace-header',
  templateUrl: './table-cell-app-cforgspace-header.component.html',
  styleUrls: ['./table-cell-app-cforgspace-header.component.scss'],
})
export class TableCellAppCfOrgSpaceHeaderComponent extends TableCellAppCfOrgSpaceBase {

  constructor(store: Store<CFAppState>) {
    super(store);
    this.init();
  }

}
