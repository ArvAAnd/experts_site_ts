import React, { useEffect } from "react";
import { useThemesStore } from "../store/themesStore";
import { Connect } from "../connect/Connect";
import { useThemesUpdateStore } from "../store/themeUpdateStore";

export const useThemesShow = () => {
    const { themes, setThemes } = useThemesStore();
    const { themesUpdate } = useThemesUpdateStore();

    
    const getThemes = async () => {
        const response = await Connect.axiosGetTheme();
        //console.log(response)
        setThemes(response.data);
    }

    useEffect(() => {
        getThemes();
    }, [themesUpdate])

    return (
        {
            themes
        }
    )
}
