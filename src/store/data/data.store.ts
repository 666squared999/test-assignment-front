import { CounterStore } from "./counter.store";

export class DataStore {
    public counterStore: CounterStore;
    constructor() {
        this.counterStore = new CounterStore();
    }
}
