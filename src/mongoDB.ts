import { MongoClient } from 'mongodb';

type FilmeType = {
    title: string;
    year: number;
    director: string;
}

export default class MongoDB {
  private uri: string;

  private client: MongoClient;

  constructor() {
    this.uri = 'mongodb://localhost:27017';
    this.client = new MongoClient(this.uri);
  }

  async connect() {
    await this.client.connect();
  }

  async close() {
    await this.client.close();
  }

  async insertFilme(filme: FilmeType) {
    const database = this.client.db('test');
    const collection = database.collection('filme');
    await collection.insertOne(filme);
  }

  async find(query: any) {
    const database = this.client.db('test');
    const collection = database.collection('filme');
    const response = await collection.find(query).toArray();
    return response;
  }

  async delete(query: any) {
    const database = this.client.db('test');
    const collection = database.collection('filme');
    const response = await collection.deleteOne(query);
    return response;
  }

  async update(query: any, filme: FilmeType) {
    const database = this.client.db('test');
    const collection = database.collection('filme');
    collection.updateOne(query, filme);
  }
}
