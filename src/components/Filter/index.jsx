import { Button, Checkbox, Paper, TextField } from '@mui/material'
import React, { useState } from 'react'
import "./filter.css"
import _ from "lodash"

const Filter = (props) => {
    const { data, filterData, handleChangeFilters } = props
    const filters = Object.keys(data[0])

    console.log("filterData::::",filterData)
    return (
        <Paper className='filter-root'>
            {filters.map((item, index) => (
                <div key={`filter-item-${index}`} className='filter-item'>
                    <h4>{item}</h4>
                    <TextField name={_.camelCase(item)} value={filterData[item]} onChange={handleChangeFilters}/>
                </div>
            ))}
            <Button type='primary'>Filter</Button>
        </Paper>
    )
}

export default Filter