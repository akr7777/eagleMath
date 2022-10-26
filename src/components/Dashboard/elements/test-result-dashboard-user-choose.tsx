import s1 from "../styles.module.css";
import {UserType} from "../../features/usersSlice";
import React from "react";
import {IdFiledType} from "../../features/categoriesSlice";

type TestResultDashboardUserChooseType = {
    setUserId: (userId: string) => void,
    userList: Array<UserType>,
    userId: IdFiledType,
}
const TestResultDashboardUserChoose = (props:TestResultDashboardUserChooseType) => {
    return <div className={s1.user_id_div}>
        <select
            className={s1.user_id_selection}
            onChange={(e) => props.setUserId(e.currentTarget.value)}
            defaultValue={props.userId}
        >
            <option value={""}></option>
            {
                props.userList.map((user: UserType) => {
                    return <option key={user.userId} value={user.userId} /*selected={props.userId === user.userId}*/>
                        {user.name}
                    </option>
                })
            }
        </select>
    </div>
}

export default TestResultDashboardUserChoose;