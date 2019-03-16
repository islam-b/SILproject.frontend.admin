import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import {Observable, of as observableOf, merge, Subscription} from 'rxjs';
import {Marque} from '../entities/Marque';
import {MarqueService} from '../services/marque.service';


/**
 * Data source for the TableMarques view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TableMarquesDataSource extends DataSource<Marque> {
  data: Marque[] = [];
  subscription: Subscription;
  isLoading = true;

  constructor(private marqueService: MarqueService, private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Marque[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.

    this.subscription = this.marqueService.marquesSubject.subscribe( data => {
      this.isLoading = false;
      this.data = data;
    });
    this.marqueService.showAllmarque();
    const dataMutations = [
      this.marqueService.marquesSubject,
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
  private getPagedData(data: Marque[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Marque[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'Code': return compare(a.CodeMarque, b.CodeMarque, isAsc);
        case 'Nom': return compare(+a.NomMarque, +b.NomMarque, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
