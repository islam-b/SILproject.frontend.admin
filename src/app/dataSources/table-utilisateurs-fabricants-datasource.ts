import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import {Observable, of as observableOf, merge, Subscription} from 'rxjs';
import {ViewUpdateService} from '../services/view-update.service';
import {UtilisateurfabricantService} from '../services/utilisateurfabricant.service';
import {UtilisateurFabricant} from '../entities/UtilisateurFabricant';

export class TableUtilisateursFabricantsDataSource extends DataSource<UtilisateurFabricant> {
  data: UtilisateurFabricant[] = [];
  subscription: Subscription;
  isLoading = true;

  constructor(private view: ViewUpdateService, private utilfabService: UtilisateurfabricantService,
              private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<UtilisateurFabricant[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.

    this.subscription = this.utilfabService.utilisateursSubject.subscribe( data => {
      this.isLoading = false;
      this.data = data;
    }, error => {
      this.isLoading = false;
    });
    this.view.showAllUsers();
    const dataMutations = [
      this.utilfabService.utilisateursSubject,
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: UtilisateurFabricant[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: UtilisateurFabricant[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'Id': return compare(a.IdUserF, b.IdUserF, isAsc);
        case 'Nom': return compare(a.Nom, b.Nom, isAsc);
        case 'Prénom': return compare(a.Prenom, b.Prenom, isAsc);
        case 'Téléphone': return compare(a.NumTel, b.NumTel, isAsc);
        case 'Fabricant': return compare(a.marque.NomMarque, b.marque.NomMarque, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
