import Tree, {NodeId} from '@naisutech/react-tree'
import {ReactTreeTheme} from "@naisutech/react-tree/types/Tree";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../store/store";
import {setAllCategoriesAC, setAllMaterialsAC} from "../features/materialsSlice";

/*type NodeType = {
    id: number,
    parentId: number | null,
    label: string,
    items: Array<NodeType>,
}
type InitDataType = Array<NodeType>
const initData:InitDataType = [
    {
        "id": 12345678,
        "parentId": null,
        "label": "My parent node",
        "items": [
            {
                "id": 87654321,
                "label": "My file",
                "parentId": 12345678,
                'items': []
            }
        ]
    },
    {
        "id": 56789012,
        "parentId": 12345678,
        "label": "My child node",
        'items':[]
    }
]*/

type MyThemeType = {
    modifiedDarkLarge: ReactTreeTheme,
}
const myThemes: MyThemeType = {
    modifiedDarkLarge: {
        text: '#fafafa', // text color
        bg: '#2d3439', // background color of whole tree
        indicator: 'gold', // open folder indicator color
        separator: 'gold', // row seperator color
        icon: 'gold', // fill & stroke color of default icons - has no effect when using custom icons
        selectedBg: '#3f464e', // background of selected element
        selectedText: '#fafafa', // text color of selected element
        hoverBg: '#505a63', // background of hovered element
        hoverText: '#fafafa', // text color of hovered element
        accentBg: '#2d3439', // background of empty folder element
        accentText: '#999', // text color of empty folder element
        textSize: 'large' // preferred text size
    }
}

const Tree4 = () => {
    let dispatch = useAppDispatch();
    dispatch(setAllMaterialsAC());
    dispatch(setAllCategoriesAC());

    const categories = [...useSelector((state: RootState) => state.materials.categories)];
    const materials = [...useSelector((state: RootState) => state.materials.materials)];
    //const nodeData1 = categories.concat(materials);

    const nodeData = categories.map(c => {
        let mat = materials.find(m => c.id == m.parentId);
        if (mat && c.items) {
            return {...c, items: [...c.items, mat] }
        } else {
            return c
        }
    });

    const TreeOnChangeHandler = (nodeIds: NodeId[]) => {
        console.log('Tree4/TreeOnChangeHandler/nodeIds=', nodeIds)
    }
    return <Tree nodes={nodeData}
        //isLoading={true}
                 theme="modifiedDarkLarge"
                 customTheme={myThemes}
                 onSelect={(nodeIds) => TreeOnChangeHandler(nodeIds)}
    />
}

export default Tree4;