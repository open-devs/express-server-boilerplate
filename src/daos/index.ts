import { connect, connection, Connection } from 'mongoose';
import { Product, IProductModel } from '../models/index';

declare interface IModels {
  Product: IProductModel;
}

export class DB {

  private static instance: DB;

  private mongoDB: Connection;
  private models: IModels;


  constructor() {
  	try {
  		connect(process.env.MONGO_URL as string, { useNewUrlParser: true, useUnifiedTopology: true });
  	} catch (err) {
  		console.error(err);
  	}
  	this.mongoDB = connection;
  	this.mongoDB.on('open', this.connected);
  	this.mongoDB.on('error', this.error);

  	this.models = { Product: new Product().model };
  }

  public static get Models() {
  	if (!DB.instance) {
  		DB.instance = new DB();
  	}
  	return DB.instance.models;
  }

  private connected() {
  	console.info('Mongoose has connected');
  }


  private error(error: Error) {
  	console.info('Mongoose has errored', error);
  }
}

export { ProductDao, IProductDao } from './Product/ProductDao';
