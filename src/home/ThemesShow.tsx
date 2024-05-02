import React from 'react';
import { Select, Space } from 'antd';
import type { SelectProps } from 'antd';
import { useThemesShow } from '../custom-hook/useThemesShow';


export const ThemesShow = () => {
    const {handleSubmit, onSubmit, handleSubmitExpert, handleSubmitInterested, options, defaultForExpert, defaultForInterested} = useThemesShow();

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
           <h1>Themes</h1>
           <p>Expert themes:</p>
           <Select
                mode="multiple"
                placeholder="Please select"
                style={{ width: '100%' }}
                allowClear
                onChange={handleSubmitExpert}
                defaultValue={defaultForExpert()}
                options={options}
                />
            <p>Interested themes:</p>
            <Select
                mode="multiple"
                placeholder="Please select"
                style={{ width: '100%' }}
                allowClear
                onChange={handleSubmitInterested}
                defaultValue={defaultForInterested()}
                options={options}
                />
            <button type="submit">Submit</button>
        </form>
    )
}