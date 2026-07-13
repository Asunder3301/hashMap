export class HashMap {
  loadFactor = 0.75;
  capacity = 16;
  size = 0;

  constructor() {
    this.buckets = Array.from({ length: this.capacity }, () => []);
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds.");
    }

    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      const pair = bucket[i];

      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }

    bucket.push([key, value]);
    this.size++;

    //Resize the map if the size is greater than the load
    if (this.size / this.capacity > this.loadFactor) {
      this.resize();
    }
  }

  get(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds.");
    }

    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      const [storedKey, storedVal] = bucket[i];

      if (storedKey === key) {
        return storedVal;
      }
    }

    return null;
  }

  has(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds.");
    }

    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      const [storedKey] = bucket[i];

      if (storedKey === key) {
        return true;
      }
    }

    return false;
  }

  remove(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds.");
    }

    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      const [storedKey] = bucket[i];

      if (storedKey === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }

    return false;
  }

  length() {
    let count = 0;
    this.buckets.forEach((bucket) => {
      count += bucket.length;
    });

    return count;
  }

  clear() {
    this.buckets = new Array(this.size);
  }

  keys() {
    const keys = [];

    this.buckets.forEach((bucket) => {
      if (bucket) {
        for (const pair of bucket) {
          keys.push(pair[0]);
        }
      }
    });

    return keys;
  }

  values() {
    const values = [];

    this.buckets.forEach((bucket) => {
      if (bucket) {
        for (const pair of bucket) {
          values.push(pair[1]);
        }
      }
    });

    return values;
  }

  entries() {
    const entries = [];

    this.buckets.forEach((bucket) => {
      if (bucket) {
        for (const [key, value] of bucket) {
          entries.push([key, value]);
        }
      }
    });

    return entries;
  }
}
