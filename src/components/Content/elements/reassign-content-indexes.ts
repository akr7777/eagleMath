import {ContentType} from "../../features/contentSlice";

const reassignContentIndexes = (content: ContentType[], newChapter: ContentType, index: number):ContentType[] => {
   /* const result = content.slice(0, newChapter.index);
    result.push(newChapter);
    result.concat(content.slice(newChapter.index + 2, content.length));*/
    const result:ContentType[] = [
        ...content.slice(0, index),
        newChapter,
        ...content.slice(index, content.length)
    ];
    return result;
}

export default reassignContentIndexes;