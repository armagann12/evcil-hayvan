import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Pet } from 'src/app/Pet';

@Component({
  selector: 'app-pets-item',
  templateUrl: './pets-item.component.html',
  styleUrls: ['./pets-item.component.css']
})
export class PetsItemComponent implements OnInit {
  @Input() pet: Pet
  @Output() onDeletePet: EventEmitter<Pet> = new EventEmitter()
  @Output() onEditPet: EventEmitter<any> = new EventEmitter()
  name: string
  file: File | null
  filePath: string
  newPet: any
  img: any
  imgSrc: any
  showModal = false

  constructor(private storage: AngularFireStorage) { }

  ngOnInit(): void {
  }

  openModal() {
    this.showModal = true
    this.imgSrc = this.pet.imageURL
  }

  closeModal() {
    this.showModal = false
  }

  updateFile(event) {
    this.file = event.target.files[0]
    this.filePath = `animals-img/${this.file.name}`

    //Shows the Preview of the image if new image is selected
    //Else it shows the default image
    const reader = new FileReader()
    reader.onload = (e: any) => this.imgSrc = e.target.result
    reader.readAsDataURL(this.file)
    this.imgSrc = this.file
  }

  onSubmit() {
    if (!this.pet.name) {
      alert("You cant send empty fields")
      return
    }
    this.newPet = {
      name: this.pet.name,
      age: this.pet.age,
      family: this.pet.family,
      species: this.pet.species,
      imagePath: this.file !== undefined ? this.filePath : this.pet.imagePath,
      imageURL: this.pet.imageURL,
    }

    //Uploads the new image to Firebase Storage
    //Changes imageURL to new image from Firebase Storage
    //Does not delete the old image from Firebase Storage
    if (this.file !== undefined) {
      const upload = this.storage.upload(this.filePath, this.file)
      upload.then(() => {
        this.storage.ref(this.filePath).getDownloadURL().subscribe(data => {
          this.newPet.imageURL = data
          this.onEditPet.emit({ id: this.pet.id, newPet: this.newPet })
        })
      })
    } else {
      this.onEditPet.emit({ id: this.pet.id, newPet: this.newPet })
    }

    this.closeModal()
  }

  onDelete(pet: Pet) {
    this.onDeletePet.emit(pet)
  }
}
