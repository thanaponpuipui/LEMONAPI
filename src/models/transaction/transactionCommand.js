const db = require('../../database/lemondb');

class Transaction {
  constructor () {
    this.client
  }

  getClient () {
    if (!this.client) throw new Error('no client has connected!');
    return this.client;
  }

  async initTransaction () {
    this.client = await db.connect();
    return getClient();
  }

  async startTransaction () {
    try {
      if (!this.client) throw new Error('no client has connected!');
      await this.client.query('BEGIN');
    } catch (e) {
      throw e;
    }
  }

  async endTransaction () {
    try {
      if (!this.client) throw new Error('no client has connected!');
      await this.client.query('COMMIT');
    } catch (e) {
      throw e;
    } 
  }

  async Rollback () {
    try {
      if (!this.client) throw new Error('no client has connected!');
      await this.client.query('ROLLBACK');
    } catch (e) {
      throw e;
    } 
  }

  release () {
    if (this.client) {
      this.client.release()
      this.client = null;
    }
  }
}

module.exports = Transaction;