import { GridLayout } from '@egjs/react-infinitegrid'
import React from 'react'
import SheetFolded from './SheetFolded'
import styles from '../styles/core.module.css'

function getItems(nextGroupKey:number, nextKey:number, count:number) {
    const nextItems = [];

    for (let i = 0; i < count; ++i) {
        nextItems.push({ groupKey: nextGroupKey, key: nextKey + i, data:{
            id:`${nextGroupKey}-${nextKey + i}`,
            title: "how to be right" + `${nextGroupKey}-${nextKey + i}`,
            summary: "sumary ...",
            likes: BigInt(55),
            author: {
                id: "id: 1",
                name: "Bob",
            },
            tags: ["tag", "tog", "duh"]
        }
        
        });
    }
    return nextItems;
}

export default function Sheets() {
    const [items, setItems] = React.useState(getItems(0, 0, 10))
    return (
<GridLayout
            className={`gridlayout ${styles.container_grid}`}
            groupBy={item => item.props["data-groupkey"]}
            options={{
                isOverflowScroll: false,
                useFit: true,
                useRecycle: true,
                horizontal: false,
            }}
            layoutOptions={{
                margin: 10,
                align: "justify",
            }}
            onAppend={e => {
                const nextGroupKey = (+e.groupKey! || 0) + 1;
                const nextKey = items.length;

                setItems([
                    ...items,
                    ...getItems(nextGroupKey, nextKey, 10),
                ]);
            }}>
	{items.map((item, i) => {      
        return (<SheetFolded data-groupkey={item.groupKey} key={"sheet"+i} data={item.data} />) 
    })}
</GridLayout>
    )
}
