// Storage interface for Cat Tarot app
// No persistent storage needed for this application

export interface IStorage {
  // Add storage methods here if needed in the future
}

export class MemStorage implements IStorage {
  constructor() {
    // No data to store
  }
}

export const storage = new MemStorage();
