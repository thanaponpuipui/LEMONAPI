const db = require('../database/lemondb');

//abstract class for models
class Model {
  constructor(client = db) {
    this.client = client;
    if (this.constructor === 'model') throw new Error('error intantiate abstract class!');
  }

  getClient() {
    return this.client;
  }

  setClient(client) {
    this.client = client;
  }
}

module.exports = Model;
