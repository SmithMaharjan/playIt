import React, { useState } from 'react'

const useToggle = (Initial = false) => {
    const [isOpen, seIisOpen] = useState(Initial)
    const open = () => {
        seIisOpen(true)
    }
    const close = () => {
        seIisOpen(false)
    }
    const toggle = () => {
        seIisOpen((prev) => !prev)
    }
    return { open, close, toggle, isOpen }
}

export default useToggle