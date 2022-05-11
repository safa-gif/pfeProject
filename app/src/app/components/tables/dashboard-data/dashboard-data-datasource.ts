import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface DashboardDataItem {
  // name: string;
  // id: number;
  item_number: string;
  // item_name: string;
  // besoin: number;
  calendar_year: number;
  planning_date: Date;
  week: number;
  week_prod: number;
  // order_number: number;
  // customer_name:string;
  // on_hand_balance: number;
  month: string,
  StatusCommande: string;
  BesoinNet:number;
  BesoinBrut: number;

}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: DashboardDataItem[] = [
];

/**
 * Data source for the DashboardData view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DashboardDataDataSource extends DataSource<DashboardDataItem> {
  data: DashboardDataItem[] = EXAMPLE_DATA;
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
  connect(): Observable<DashboardDataItem[]> {
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
  private getPagedData(data: DashboardDataItem[]): DashboardDataItem[] {
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
  private getSortedData(data: DashboardDataItem[]): DashboardDataItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        // case 'item_name': return compare(a.item_name, b.item_name, isAsc);
        case 'item_number': return compare(a.item_number, b.item_number, isAsc);
        // case 'ion_hanb_balance': return compare(+a.on_hand_balance, +b.on_hand_balance, isAsc);
        // case 'besoin': return compare(+a.besoin, +b.besoin, isAsc);
        case 'week': return compare(+a.week, +b.week, isAsc);
        case 'week_prod': return compare(+a.week_prod, +b.week_prod, isAsc);

        case 'month': return compare(a.month, b.month, isAsc);
        case 'week_prod': return compare(+a.week_prod, +b.week_prod, isAsc);
        case 'BesoinNet': return compare(+a.BesoinNet, +b.BesoinNet, isAsc);
        case 'BesoinBrut': return compare(+a.BesoinBrut, +b.BesoinBrut, isAsc);
        case 'calendar_year': return compare(+a.calendar_year, +b.calendar_year, isAsc);
        case 'StatusCommande': return compare(a.StatusCommande, b.StatusCommande, isAsc);

        // case 'planning_date': return compare(a.item_name, b.item_name, isAsc);
        // case 'order_number': return compare(+a.order_number, +b.order_number, isAsc);

        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
