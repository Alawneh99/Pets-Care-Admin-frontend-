import { ChangeDetectorRef, Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MainServiceService } from '../../backend/main-service.service';
import { Categories } from '../../dto\'s/category.dto';
import { CategoryDialogComponent } from 'src/app/sharedcomponent/categorydialog/categorydialog.component';
import { ConfirmDialogComponent } from 'src/app/sharedcomponent/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './managecategories.component.html',
  styleUrls: ['./managecategories.component.css']
})
export class ManageCategoriesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'image', 'actions'];
  dataSource: MatTableDataSource<Categories>;

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(private mainService: MainServiceService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Categories>([]);
  }

  ngOnInit() {
    this.fetchCategories();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchCategories(): void {
    this.mainService.GetAllCategories().subscribe(categories => {
      this.dataSource.data = categories;
    }, error => {
      console.error('Error fetching categories:', error);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editCategory(category: Categories) {
    // Show the category dialog with the selected category
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      data: { category }
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.mainService.UpdateCategory(result.id, result).subscribe(updatedCategory => {
          if (updatedCategory && updatedCategory.id !== undefined) {
            const index = this.dataSource.data.findIndex(cat => cat.id === updatedCategory.id);
            if (index !== -1) {
              this.dataSource.data[index] = updatedCategory;
              this.dataSource._updateChangeSubscription(); // Refresh the table
            }
          } else {
            console.error('Updated category does not have a valid id:', updatedCategory);
          }
        }, error => {
          console.error('Error updating category:', error);
        });
      }
    });
  }

  deleteCategory(category: Categories) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { title: 'Confirm Delete', message: `Are you sure you want to delete the category "${category.name}"?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.mainService.DeleteCategory(category.id).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(cat => cat.id !== category.id);
        }, error => {
          console.error('Error deleting category:', error);
        });
      }
    });
  }

  addCategory() {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '400px',
      data: { category: new Categories(0, '', '') }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.mainService.AddCategory(result).subscribe(addedCategory => {
          this.dataSource.data = [...this.dataSource.data, addedCategory];
          this.dataSource._updateChangeSubscription();
        }, error => {
          console.error('Error adding category:', error);
        });
      }
    });
  }
}
