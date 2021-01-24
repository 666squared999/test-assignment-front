import { observer } from 'mobx-react';
import React, {FC} from 'react'
import { useStore } from '../../store/utils/useStore'

export const Button:FC = observer(() => {
    const {dataStore: {counterStore}} = useStore();

    return <><button onClick={() => counterStore.increment()}>
    {counterStore.value}
</button><button onClick={() => counterStore.value = counterStore.value + 2}>
    {counterStore.value}
</button></>
})
