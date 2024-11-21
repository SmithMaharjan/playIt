import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserState'

const Random = () => {
    const { userData } = useContext(UserContext)
    console.log(userData)
    return (
        <div>Random</div>
    )
}

export default Random