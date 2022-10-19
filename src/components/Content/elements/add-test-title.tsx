import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

type AddTestTitle = {
    title: string,
    setTitle: (title: string) => void,
}
const AddTestTitle = (props: AddTestTitle) => {
    return <div>
        <TextField variant={"outlined"} value={props.title} onChange={(e) => props.setTitle(e.currentTarget.value)}/>
    </div>
}

export default AddTestTitle;