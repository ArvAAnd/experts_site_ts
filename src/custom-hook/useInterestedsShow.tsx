import React, { useEffect, useState } from "react";
import { useInterestedsStore } from "../store/interestedsStore";
import { Connect } from "../connect/Connect";
import { useThemesUpdateStore } from "../store/themeUpdateStore";
import { UserAndTheme } from "../types/user";

export const useInterestedsShow = () => {
    const { interesteds, setStayInteresteds } = useInterestedsStore();
    const { themesUpdate } = useThemesUpdateStore();
    const [interestedState, setInterestedState] = useState<UserAndTheme[]>();

    const getInteresteds = async () => {
        const response = await Connect.axiosGetInteresteds();
        //console.log(response)
        setStayInteresteds(response.data);
    }
    useEffect(() => {
        getInteresteds();
    },[themesUpdate])

    return (
        {
            interesteds
        }
    )
}
