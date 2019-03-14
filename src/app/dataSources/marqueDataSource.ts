import {DataSource} from '@angular/cdk/table';
import {Observable} from 'rxjs';
import {Marque} from '../entities/Marque';
import {MarqueService} from '../services/marque.service';

export class MarqueDataSource extends DataSource<any> {

  constructor(private marqueService: MarqueService) {
    super();
  }

  connect(): Observable<Marque[]> {
    let data = this.marqueService.getAllMarques();
    console.log(data);
    return data;
  }

  disconnect(): void {
  }

}
