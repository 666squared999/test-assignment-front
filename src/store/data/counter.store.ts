import { action, computed, observable } from "mobx";

export class CounterStore {
    @observable
    private _value: number = 0;

    @computed
    get value(): number {
        return this._value;
    }
    set value(val: number) {
        this._value = val;
    }

    @action
    public increment(): void {
        this._value++;
    }
}
