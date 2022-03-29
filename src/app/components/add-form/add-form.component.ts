import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Pet } from 'src/app/Pet';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {
  @Input() pet: Pet
  @Output() onAddPet: EventEmitter<any> = new EventEmitter()
  name: string
  age: number
  family: string
  species: string
  file: null | File
  filePath: string
  url: any
  newPet: any
  imgSrc: string
  selectedImg: any
  showModal = false

  constructor(private storage: AngularFireStorage) { }

  ngOnInit(): void {
  }

  openModal() {
    this.showModal = true
  }

  closeModal() {
    this.showModal = false
  }

  uploadFile(event) {
    this.file = event.target.files[0]
    this.filePath = `animals-img/${this.file.name}`

    //Show the Preview of the image if the image is selected
    if (this.file && event.target.files) {
      const reader = new FileReader()
      reader.onload = (e: any) => this.imgSrc = e.target.result
      reader.readAsDataURL(this.file)
      this.selectedImg = this.file
    } else {
      this.imgSrc = ""
      this.selectedImg = null
    }
  }

  onSubmit() {
    if (!this.name || !this.age || !this.family || !this.species) {
      alert("You cant send empty fields")
      return
    }
    this.newPet = {
      name: this.name,
      age: this.age,
      family: this.family,
      species: this.species,
      imagePath: this.file !== undefined ? this.filePath : "",
      createdAt: Date.now()
    }

    //Uploads the image to Firebase Storage if the image is selected
    //Adds the URL of the image to data from Firebase Storage
    if (this.file !== undefined) {
      const upload = this.storage.upload(this.filePath, this.file)
      upload.then(() => {
        this.storage.ref(this.filePath).getDownloadURL().subscribe(data => {
          this.newPet.imageURL = data
          this.onAddPet.emit(this.newPet)
        })
      })
    } else {
      this.onAddPet.emit(this.newPet)
    }

    this.name = ""
    this.age = null
    this.family = ""
    this.species = ""
    this.imgSrc = ""
    this.closeModal()
  }

}
