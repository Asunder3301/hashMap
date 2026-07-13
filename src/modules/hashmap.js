import { LinkedList } from "./linkedlist";

export class HashMap {
  loadFactor = 0.75;
  capacity = 16;
  size = 0;

  constructor() {
    this.buckets = Array.from(
      { length: this.capacity },
      () => new LinkedList()
    );
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
    const linkedlist = this.buckets[index];

    let temp = linkedlist.head;
    while (temp) {
      const [storedKey] = temp.value;
      if (storedKey === key) {
        temp.value[1] = value;
        return;
      }

      temp = temp.nextNode;
    }

    linkedlist.append([key, value]);
    this.size++;

    //Resize the map if the size is greater than the load
    if (this.size / this.capacity > this.loadFactor) {
      this.resize();
    }
  }

  get(key) {
    const index = this.hash(key);
    const linkedlist = this.buckets[index];

    let temp = linkedlist.head;
    while (temp) {
      const [storedKey, storedVal] = temp.value;
      if (storedKey === key) {
        return storedVal;
      }

      temp = temp.nextNode;
    }

    return null;
  }

  has(key) {
    const index = this.hash(key);
    const linkedlist = this.buckets[index];

    let temp = linkedlist.head;
    while (temp) {
      const [storedKey] = temp.value;
      if (storedKey === key) {
        return true;
      }

      temp = temp.nextNode;
    }

    return false;
  }

  remove(key) {
    const index = this.hash(key);
    const linkedlist = this.buckets[index];

    let temp = linkedlist.head;
    let listIndex = 0;

    while (temp) {
      const [storedKey] = temp.value;
      if (storedKey === key) {
        linkedlist.removeAt(listIndex);
        this.size--;
        return true;
      }

      temp = temp.nextNode;
      listIndex++;
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
    this.capacity = 16;
    this.size = 0;
    this.buckets = Array.from({ length: this.capacity }, () => []);
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

  resize() {
    const old = this.buckets;

    this.capacity *= 2;
    this.size = 0;
    this.buckets = Array.from({ length: this.capacity }, () => []);

    //Loop through old buckets/rehash old data
    for (let i = 0; i < old.length; i++) {
      const bucket = old[i];
      for (let j = 0; j < bucket.length; j++) {
        const [key, value] = bucket[j];

        this.set(key, value);
      }
    }
  }
}
