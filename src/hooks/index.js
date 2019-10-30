import React from 'react'

export const useModal = (initialMode = false) => {
    const [isOpen,setIsOpen] = React.useState(initialMode)
    const toggle = () => setIsOpen(!isOpen)

    return [isOpen, toggle]
}