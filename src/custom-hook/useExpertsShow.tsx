import React, { useEffect } from "react";
import { useExpertsStore } from "../store/expertsStore";
import { Connect } from "../connect/Connect";
import { useThemesUpdateStore } from "../store/themeUpdateStore";

export const useExpertsShow = () => {
    const { experts, setStayExpert } = useExpertsStore();
    const { themesUpdate } = useThemesUpdateStore();

    const getExperts = async () => {
        const response = await Connect.axiosGetExperts();
        //console.log(response)
        setStayExpert(response.data);
    }
    useEffect(() => {
        getExperts();
    }, [themesUpdate])

    return (
        {
            experts
        }
    )
}
