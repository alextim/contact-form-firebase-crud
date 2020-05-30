/* eslint-disable no-console */
import firebaseDb from './firebaseConfig';

export default class Db {
  constructor() {
    this.emailsRef = firebaseDb.collection('emails');
  }

  async getAll() {
    const snapshot = await this.emailsRef.get();
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  async get(id) {
    console.log('get(id), id=', id);
    const doc = await this.emailsRef.doc(id).get();
    console.log(doc.exists ? 'Found!' : 'Not found!');
    return doc.exists ? doc.data() : null;
  }

  async add(data) {
    console.log('add(data), data=', data);
    const docRef = await this.emailsRef.add(data);
    console.log('Data added! id=', docRef.id);
    return docRef.id;
  }

  async update(id, data) {
    console.log('update(id,data) id, data=', id, data);
    await this.emailsRef.doc(id).set(data);
    console.log('Updated!');
  }

  async delete(id) {
    console.log('delete(id), id=', id);
    await this.emailsRef.doc(id).delete();
    console.log('Deleted!');
  }
}
