import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Categories } from 'src/app/dto\'s/category.dto';

@Component({
  selector: 'app-categorydialog',
  templateUrl: './categorydialog.component.html',
  styleUrls: ['./categorydialog.component.css']
})
export class CategoryDialogComponent {
  category: Categories;

  constructor(
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.category = data.category;
  }

  onSave(): void {
    this.dialogRef.close(this.category); // Return the category to the calling component
  }

  onCancel(): void {
    this.dialogRef.close(); // Simply close the dialog
  }
}
