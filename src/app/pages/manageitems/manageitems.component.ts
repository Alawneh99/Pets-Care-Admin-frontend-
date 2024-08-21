import { ChangeDetectorRef, Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MainServiceService } from '../../backend/main-service.service';
import { Item } from '../../dto\'s/item.dto';
import { ConfirmDialogComponent } from 'src/app/sharedcomponent/confirm-dialog/confirm-dialog.component';
import { ItemDialogComponent } from 'src/app/sharedcomponent/itemdialog/itemdialog.component';

@Component({
  selector: 'app-manage-items',
  templateUrl: './manageitems.component.html',
  styleUrls: ['./manageitems.component.css']
})
export class ManageItemsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'image', 'price', 'quantity', 'isHaveDiscount', 'discountAmount', 'discountType', 'actions'];
  dataSource: MatTableDataSource<Item>;

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(private mainService: MainServiceService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Item>([]); // Initialize with an empty array of Items
  }

  ngOnInit() {
    this.fetchItems();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchItems(): void {
    this.mainService.GetAllItems().subscribe(items => {
      this.dataSource.data = items;
    }, error => {
      console.error('Error fetching items:', error);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editItem(item: Item) {
    const dialogRef = this.dialog.open(ItemDialogComponent, {
      data: { item }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.mainService.UpdateItem(result.id, result).subscribe(updatedItem => {
          const index = this.dataSource.data.findIndex(i => i.id === updatedItem.id);
          if (index !== -1) {
            this.dataSource.data[index] = updatedItem;
            this.dataSource._updateChangeSubscription(); // Refresh the table
          }
        }, error => {
          console.error('Error updating item:', error);
        });
      }
    });
  }

  deleteItem(item: Item) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Item',
        message: 'Are you sure you want to delete this item?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.mainService.DeleteItem(item.id).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(i => i.id !== item.id);
        }, error => {
          console.error('Error deleting item:', error);
        });
      }
    });
  }

  addItem() {
    const newItem = new Item(0, 'New Item', 'New Description', 'https://example.com/new-item-image.png', 0, 0, false, 0, '', 1, 100); // Example new item
    const dialogRef = this.dialog.open(ItemDialogComponent, {
      data: { item: newItem }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.mainService.AddItem(result).subscribe(addedItem => {
          this.dataSource.data = [...this.dataSource.data, addedItem];
          this.dataSource._updateChangeSubscription(); // Refresh the table
        }, error => {
          console.error('Error adding item:', error);
        });
      }
    });
  }
}
