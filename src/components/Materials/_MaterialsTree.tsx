import * as React from 'react';
import {useState} from 'react';
import {MouseEvent} from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
//import {CategoriesType, CategoryType, MaterialsType} from "../features/materialsSlice";
import materials from "./Materials";

/*
function sorting(categories: CategoriesType, materials: MaterialsType) {
    /!*function createTree(array:CategoriesType = []) {
        let map = new Map();
        for (const item of array)
            if (map.has(item.parentCatId))
                map.get(item.parentCatId).push(item);
            else map.set(item.parentCatId, [item]);
        for(const [parentId, items] of map.entries())
            for( const item of items)
                if (map.has(item.catID)) item.children = map.get(item.catID);
        return map.get(null);
    }


    let result = [];
    let tempArr = categories.filter( (cat, ind) => Number(cat.parentCatId)===0)

    //console.log('ControlledTreeView/tempArr=',tempArr)
    //console.log('ControlledTreeView/after=', categories.filter( c => c.parentCatId===1))
    return result;*!/

    /!*const tree = new Map();
    for (let i=0; i<categories.length; i++) {
        if (categories[i].parentCatId === 0) {
            let temp = categories.filter( c => {
                if (c.parentCatId === categories[i].catID)
                    return c.catTitle + String(c.catID)
            })
            console.log('temp=', temp)
            tree.set( (categories[i].catTitle+String(categories[i].catID)), temp);
        }

    }
    return tree;*!/

    const tree = new Map();
    const parentIDCategoriesArr: Array<number> = [];
    categories.forEach(el => {
        if (parentIDCategoriesArr.every(p => p !== el.parentCatId))
            parentIDCategoriesArr.push(el.parentCatId)
    })
    console.log('materials/ControlledTreeView/parentIDCategoriesArr=', parentIDCategoriesArr);

    for (let i = 0; i < categories.length; i++) {

    }
    return tree;
}

function buildNode(item: CategoryType, cat: CategoriesType) {
    let result = '<li id="' + item.catID + '">' + item.catTitle;
    let children = '';
    cat.filter(function (i) {
        return i.parentCatId == item.catID;
    })
        .forEach(function (i) {
            children += buildNode(i, cat);
        });
    if (children.length > 0) {
        result += '<ul>' + children + '</ul>';
    }
    return result + '</li>';
}

function tree1(cat: CategoriesType, mat: MaterialsType) {
    let list = '<ul>';
    cat.forEach(function (item) {
        list += buildNode(item, cat);
    });
    list += '</ul>';
    //console.log('Materials/ControlledTreeView/arr=', list);
    return list
}

function buildNodeN2(item: CategoryType, cat: CategoriesType) {
    let children = cat.filter(i => i.parentCatId === item.catID).map( i => buildNodeN2(i, cat));
    console.log('buildNodeN2 children=', children)
    return <ul>
        {children && children.map( (i,ind) => <li>{children}</li>)}
        </ul>
}

function Tree2(cat: CategoriesType, mat: MaterialsType) {
    return <ul>
        {
            cat.filter(item => item.parentCatId===0).map(item => buildNodeN2(item, cat))
        }
    </ul>
}

export default function ControlledTreeView() {
    const materials = useSelector((state: RootState) => state.materials.materials);
    //console.log('ControlledTreeView/materials=', materials)
    const categories = useSelector((state: RootState) => state.materials.categories)
    //console.log('ControlledTreeView/categories=', categories)



    const [expanded, setExpanded] = React.useState<string[]>([]);
    //const [selected, setSelected] = React.useState<string[]>([]);

    const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
        setExpanded(nodeIds);
    };

    /!*const handleSelect = (event: React.SyntheticEvent, nodeIds: string[]) => {
        setSelected(nodeIds);
    };*!/

    let treeN1 = tree1([...categories], [...materials]);
    let treeN2 = Tree2([...categories], [...materials]);

    function clickHandler1(key: number) {
        console.log('here', key)
    }

    const handleExpandClick = () => {
        setExpanded((oldExpanded) =>
            oldExpanded.length === 0 ? ['1', '5', '6', '7'] : [],
        );
    };

    /!*const handleSelectClick = () => {
        setSelected((oldSelected) =>
            oldSelected.length === 0 ? ['1', '2', '3', '4', '5', '6', '7', '8', '9'] : [],
        );
    };*!/

    return (
        <Box /!*sx={{height: 270, flexGrow: 1, maxWidth: 400, overflowY: 'auto'}}*!/>
            <ul><li>1</li><li>2</li></ul>
            <Box sx={{mb: 1}}>
                <Button onClick={handleExpandClick}>
                    {expanded.length === 0 ? 'Развернуть список' : 'Свернуть список'}
                </Button>
                {/!*<Button onClick={handleSelectClick}>
                    {selected.length === 0 ? 'Select all' : 'Unselect all'}
                </Button>*!/}
            </Box>


            {treeN1}
            =======
            {treeN2}


            <TreeView
                aria-label="controlled"
                defaultCollapseIcon={<ExpandMoreIcon/>}
                defaultExpandIcon={<ChevronRightIcon/>}
                expanded={expanded}
                /!*selected={selected}*!/
                onNodeToggle={handleToggle}
                /!*onNodeSelect={handleSelect}*!/
                /!*multiSelect*!/
            >

                {/!*<TreeItem nodeId="1" label="Applications">
                    <TreeItem nodeId="2" label="Calendar" />
                    <TreeItem nodeId="3" label="Chrome" />
                    <TreeItem nodeId="4" label="Webstorm" />
                </TreeItem>
                <TreeItem nodeId="5" label="Documents">
                    <TreeItem nodeId="6" label="MUI">
                        <TreeItem nodeId="7" label="src">
                            <TreeItem nodeId="8" label="index.js" onClick={()=>clickHandler1(999999)}/>
                            <TreeItem nodeId="9" label="tree-view.js" />
                        </TreeItem>
                    </TreeItem>
                </TreeItem>*!/}
            </TreeView>
        </Box>
    );
}*/
