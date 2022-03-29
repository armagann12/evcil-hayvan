import { Component, OnInit } from '@angular/core';
import { Pet } from 'src/app/Pet';
import { PetsService } from 'src/app/services/pets.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {

  pets: Pet[] = []

  constructor(private service: PetsService) { }

  ngOnInit(): void {
    this.service.getAll().subscribe((pet: any) => (this.pets = pet))
  }

  deletePet(pet: any) {
    this.service.deletePet(pet)
  }

  addPet(pet: any) {
    this.service.addPet(pet)
  }

  editPet(pet: any) {
    this.service.editPet(pet)
  }
}
