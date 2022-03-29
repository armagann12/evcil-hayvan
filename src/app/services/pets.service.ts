import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  constructor(private db: AngularFirestore, private storage: AngularFireStorage) { }

  getAll() {
    return this.db.collection("animals", ref => ref.orderBy("createdAt", "desc")).valueChanges({ idField: 'id' })
  }

  deletePet(pet: any) {
    const deleteFromDb = this.db.collection("animals").doc(pet.id).delete()
    const deleteFromStr = this.storage.ref(pet.imagePath).delete()
    return { deleteFromDb, deleteFromStr }
  }

  addPet(data: object) {
    return this.db.collection("animals").add(data)
  }

  editPet(data: any) {
    return this.db.collection("animals").doc(data.id).update({
      name: data.newPet.name,
      age: data.newPet.age,
      family: data.newPet.family,
      species: data.newPet.species,
      imagePath: data.newPet.imagePath,
      imageURL: data.newPet.imageURL
    })
  }
}
