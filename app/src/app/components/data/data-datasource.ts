import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface DataItem {
  item_number: string;
  item_name: string;
  besoin_net: number;
  besoin_cumulee: number;
  semaine_prod: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: DataItem[] = [

  {item_number: "Z125S5", item_name: 'Hydrogen xxxxxx', besoin_net: -12, besoin_cumulee: 42, semaine_prod: 8},
  {item_number: "Z125S5", item_name: 'Oxygene xxxxxx', besoin_net: -102,  besoin_cumulee: 41,  semaine_prod: 9},
  {item_number: "Z125S5", item_name: 'tabouret xxxxxx', besoin_net: -2, besoin_cumulee: 540 , semaine_prod: 10},
  {item_number: "Z125S5", item_name: 'eau', besoin_net: -12,  besoin_cumulee: 32 , semaine_prod: 12},
  {item_number: "Z125S5", item_name: 'Aliminum xxxxxx', besoin_net: -12,  besoin_cumulee: 112 , semaine_prod: 30},
 
];

/**
 * Data source for the Data view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataDataSource extends DataSource<DataItem> {
  data: DataItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

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
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
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
  private getPagedData(data: DataItem[]): DataItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DataItem[]): DataItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'item_number': return compare(a.item_number, b.item_number, isAsc);
        case 'item_name': return compare(a.item_name, b.item_name, isAsc);
        case 'besoin_net': return compare(+a.besoin_net, +b.besoin_net, isAsc);
        case 'besoin_cumulee': return compare(+a.besoin_cumulee, +b.besoin_cumulee, isAsc);
        case 'seamine_prod': return compare(+a.semaine_prod, +b.semaine_prod, isAsc);
 
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
