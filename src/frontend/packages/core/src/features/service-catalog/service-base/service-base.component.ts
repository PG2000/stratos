import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { EntityServiceFactory } from '../../../core/entity-service-factory.service';
import { PaginationMonitorFactory } from '../../../shared/monitors/pagination-monitor.factory';
import { ServicesService } from '../services.service';
import { CFAppState } from '../../../../../store/src/app-state';



export function servicesServiceFactory(
  store: Store<CFAppState>,
  activatedRoute: ActivatedRoute,
  entityServiceFactory: EntityServiceFactory,
  paginationMonitorFactory: PaginationMonitorFactory
) {
  return new ServicesService(store, entityServiceFactory, activatedRoute, paginationMonitorFactory);
}


@Component({
  selector: 'app-service-base',
  templateUrl: './service-base.component.html',
  styleUrls: ['./service-base.component.scss'],
  providers: [
    {
      provide: ServicesService,
      useFactory: servicesServiceFactory,
      deps: [Store, ActivatedRoute, EntityServiceFactory, PaginationMonitorFactory]
    }
  ]
})
export class ServiceBaseComponent {

  constructor(private servicesService: ServicesService, private store: Store<CFAppState>) {
  }


}
