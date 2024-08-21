import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../../backend/main-service.service';
import { Pet } from '../../dto\'s/pet.dto'; 

@Component({
  selector: 'app-getall-pets',
  templateUrl: './getall-pets.component.html',
  styleUrls: ['./getall-pets.component.css']
})
export class GetallPetsComponent implements OnInit {
  pets: Pet[] = [];

  constructor(private mainService: MainServiceService) {}

  ngOnInit(): void {
    this.fetchPets();
  }

  fetchPets(): void {
    this.mainService.GetAllPets().subscribe((pets) => {
      this.pets = pets;
    }, (error) => {
      console.error('Error fetching pets:', error);
    });
  }
}
