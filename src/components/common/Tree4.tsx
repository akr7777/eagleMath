import Tree, {NodeId} from '@naisutech/react-tree'
import {CategoryType, MaterialType} from "../features/materialsSlice";
import myTheme from "./TreeTheme";

type TreePropsType = {
    categories: Array<CategoryType>,
    materials: Array<MaterialType>,
}
const Tree4 = (props: TreePropsType) => {
    const nodeData = props.categories.map(c => {
        let mat = props.materials.filter(m => c.id == m.parentId);
        if (mat && c.items) {
            return {...c, items: [...c.items, ...mat] }
        } else {
            return c
        }
    });

    const TreeOnChangeHandler = (nodeIds: NodeId[]) => {
        console.log('Tree4/TreeOnChangeHandler/nodeIds=', nodeIds)
        //if nodeIds[0] { open material by nodeIds[0]}
    }
    return <Tree nodes={nodeData}
                 //isLoading={true}
                 theme="modifiedDarkLarge"
                 customTheme={myTheme}
                 onSelect={(nodeIds) => TreeOnChangeHandler(nodeIds)}
                 animations={true}
    />
}

export default Tree4;