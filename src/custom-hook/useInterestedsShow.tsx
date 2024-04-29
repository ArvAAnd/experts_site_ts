import React, { useEffect } from "react";
import { useInterestedsStore } from "../store/interestedsStore";
import { Connect } from "../connect/Connect";
import { useThemesUpdateStore } from "../store/themeUpdateStore";

export const useInterestedsShow = () => {
    const { interesteds, setStayInteresteds } = useInterestedsStore();
    const { themesUpdate } = useThemesUpdateStore();

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
