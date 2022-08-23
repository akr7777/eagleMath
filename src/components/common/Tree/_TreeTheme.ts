import {ReactTreeTheme} from "@naisutech/react-tree/types/Tree";

const bgColor = '#94aede';
const txtColor = '#0C0C0CFF';

const myThemes: { modifiedDarkLarge: ReactTreeTheme } = {
    modifiedDarkLarge: {
        text: txtColor, // text color
        bg: bgColor, // background color of whole tree
        indicator: bgColor, // open folder indicator color
        separator: bgColor, // row seperator color
        icon: '#173b96', // fill & stroke color of default icons - has no effect when using custom icons
        selectedBg: bgColor, // background of selected element
        //selectedText: 'gold', // text color of selected element
        selectedText: txtColor, // text color of selected element
        hoverBg: '#505a63', // background of hovered element
        hoverText: '#6592dc', // text color of hovered element
        accentBg: '#2d3439', // background of empty folder element
        accentText: '#999', // text color of empty folder element
        textSize: 'large' // preferred text size
    }
}

export default myThemes;