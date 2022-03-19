import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
// import { MatTableDataSource } from '@angular/material/table';
// import { DataserviceService } from 'src/app/services/dataservice.service';

// TODO: Replace this with your own data model type
export interface DataItem {

  item_number: string;
  item_name: string;
  planning_date: Date;
  semaine_prod: number;
  semaine_cmd: number;
  BesoinBrut : number,
  BesoinNet: number,
  on_hand_balance: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: DataItem[] = [

  // {item_number: "Z125S5", item_name: 'Hydrogen xxxxxx', semaine_prod: 8},
  // {item_number: "Z125S5", item_name: 'Oxygene xxxxxx',  semaine_prod: 9},
  // {item_number: "Z125S5", item_name: 'tabouret xxxxxx', semaine_prod: 10},
  // {item_number: "Z125S5", item_name: 'eau', semaine_prod: 12},
  // {item_number: "Z125S5", item_name: 'Aliminum xxxxxx', semaine_prod: 30}
 
];

/**
 * Data source for the Data view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataDataSource extends DataSource<DataItem> {
  donnees: DataItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  filter: string | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DataItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.donnees), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.donnees ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(donnees: DataItem[]): DataItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return donnees.splice(startIndex, this.paginator.pageSize);
    } else {
      return donnees;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(donnees: DataItem[]): DataItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return donnees;
    }

    return donnees.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'item_number': return compare(a.item_number, b.item_number, isAsc);
        case 'item_name': return compare(a.item_name, b.item_name, isAsc);
        // case 'planning_date': return compare(a.planning_date, b.planning_date, isAsc);
        case 'semaine_cmd': return compare(+a.semaine_cmd, +b.semaine_cmd, isAsc);
        case 'BesoinNet': return compare(+a.BesoinNet, +b.BesoinNet, isAsc);
        case 'BesoinBrut': return compare(+a.BesoinBrut, +b.BesoinBrut, isAsc);

        case 'seamine_prod': return compare(+a.semaine_prod, +b.semaine_prod, isAsc);
        case 'on_hand_balance': return compare(+a.on_hand_balance, +b.on_hand_balance, isAsc);
 
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number , b: string | number , isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
