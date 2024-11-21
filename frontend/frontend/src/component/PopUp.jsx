import clsx from 'clsx'
import React from 'react'

const PopUp = (props) => {
    const { open, close, toggle, isOpen, children } = props
    return (
        <div>
            <button onClick={close}>close</button>
            <div className={clsx(" absolute top-20 h-96 w-96 right-[50%] bg-slate-500 border-2 rounded-lg flex justify-center pt-4", isOpen ? "visible opacity-100" : "invisible opacity-0")}>
                {children}
            </div>
        </div>
    )
}

export default PopUp