import {CategoryType, MaterialType} from "../features/materialsSlice";

export const categoriesAPI: CategoryType[] = [
    {id: 1, parentId: null, label: "Матeматика", items: []},
    {id: 2, parentId: 1, label: "алгебра", items: []},
    {id: 3, parentId: 1, label: "rеометрия", items: []},
    {id: 4, parentId: 3, label: "круги", items: []},
    {id: '5', parentId: 3, label: "квадраты", items: []},
    {
        id: 6, parentId: null, label: "Физика",
        items:
            [
                {id: '9', parentId: 4, label: "Задача по физике №1",}
            ]
    },
]
export const materialsAPI: MaterialType[] = [
    {id: '7', parentId: 4, label: "Задача по кругам №1",},
    {id: 8, parentId: '5', label: "Задача по квадратам №1",},
]