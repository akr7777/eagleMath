import React, { Component } from 'react';
import SortableTree, {ReactSortableTreeProps, TreeItem} from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app

type TreeDataType = { title: string, children?: { title: string }[] }
type StateType = { treeData:Array<TreeDataType> }

export default class _Tree3 extends Component<ReactSortableTreeProps, {treeData:TreeItem[]}> {
    constructor(props:ReactSortableTreeProps) {
        super(props);

        this.state = {
            treeData: [
                { title: 'Chicken', children: [{ title: 'Egg' }] },
                { title: 'Fish', children: [{ title: 'fingerline' }] },
            ],
        };
    }

    render() {
        return (
            <div style={{ height: 400 }}>
                <SortableTree
                    treeData={this.state.treeData}
                    onChange={treeData => this.setState({ treeData })}
                />
            </div>
        );
    }
}