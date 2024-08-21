import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../../backend/main-service.service';
import { Categories } from '../../dto\'s/category.dto';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  categories: Categories[] = [];

  constructor(private mainService: MainServiceService) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.mainService.GetAllCategories().subscribe((categories) => {
      this.categories = categories;
    }, (error) => {
      console.error('Error fetching categories:', error);
    });
  }
}
