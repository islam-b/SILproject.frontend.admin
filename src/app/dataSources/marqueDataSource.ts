import {DataSource} from '@angular/cdk/table';
import {Observable} from 'rxjs';
import {Marque} from '../entities/Marque';
import {MarqueService} from '../services/marque.service';
import {map} from 'rxjs/operators';
export class MarqueDataSource extends DataSource<any> {


  isLoading = false;

  constructor(private marqueService: MarqueService) {
    super();
  }

  connect(): Observable<Marque[]> {
    return this.marqueService.getAllMarques();
  }

  disconnect(): void {
  }

}
