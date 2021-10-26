import { resolve } from 'path';
import { readFileSync } from 'fs';
import db from './models/index.mjs';
import initItemsController from './controllers/items.mjs';

// for production, only get this once
const manifest = JSON.parse(readFileSync(resolve(resolve(), 'dist', 'manifest.json'), 'utf-8'));

const getManifest = () => {
  if (process.env === 'production') {
    return manifest;
  }else{
    // for development, get the updated manifest file
    return JSON.parse(readFileSync(resolve(resolve(), 'dist', 'manifest.json'), 'utf8'));
  }
};

export default function bindRoutes(app) {
  const ItemsController = initItemsController(db);

  app.get('/items', ItemsController.index);

  // special JS page. Include the webpack index.html file
  app.get('/home', (request, response) => {

    const data = {
      manifest:getManifest()
    };
    response.render('index', data)
  });
}
