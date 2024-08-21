import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Item } from 'src/app/dto\'s/item.dto';

@Component({
  selector: 'app-itemdialog',
  templateUrl: './itemdialog.component.html',
  styleUrls: ['./itemdialog.component.css']
})
export class ItemDialogComponent {
  item: Item;

  constructor(
    public dialogRef: MatDialogRef<ItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.item = data.item;
  }

  onSave(): void {
    this.dialogRef.close(this.item); // Return the item to the calling component
  }

  onCancel(): void {
    this.dialogRef.close(); // Simply close the dialog
  }
}
