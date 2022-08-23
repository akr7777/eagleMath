import Tree, {NodeId} from '@naisutech/react-tree'
import {CategoryType, MaterialType} from "../../features/materialsSlice";
import myTheme from "./_TreeTheme";

type TreePropsType = {
    categories: Array<CategoryType>,
    materials: Array<MaterialType>,
}
const _Tree4 = (props: TreePropsType) => {
    const nodeData = props.categories.map(c => {
        let mat = props.materials.filter(m => c.id == m.parentId);
        if (mat && c.items) {
            return {...c, items: [...c.items, ...mat] }
        } else {
            return c
        }
    });

    const TreeOnChangeHandler = (nodeIds: NodeId[]) => {
        console.log('_Tree4/TreeOnChangeHandler/nodeIds=', nodeIds)
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

export default _Tree4;