import * as React from 'react';
import {action, computed, observable} from 'mobx';


class ItemsStore {
    @observable items = [];

    @action addItem = (bird) => {
        this.items.push(bird);
    };

    @computed get birdCount() {
        return this.items.length;
    }
}

const instance = new ItemsStore();
export default instance;
