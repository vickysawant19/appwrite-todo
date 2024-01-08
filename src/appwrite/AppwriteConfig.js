import { Client,Account, Databases,ID } from 'appwrite';

const client = new Client();



const DB_ID = '6580627524c33be9c494'
const COLLECTION_ID = '658062bbd434eec52738'

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65805f2966e742ac4545');
    


const db = new Databases(client);
const account = new Account(client)

export { client,db ,account, DB_ID,ID, COLLECTION_ID};