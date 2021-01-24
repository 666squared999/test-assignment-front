import { DataStore } from "./data/data.store";

export class RootStore {
    public dataStore: DataStore;
    constructor() {
        this.dataStore = new DataStore();
    }
}
