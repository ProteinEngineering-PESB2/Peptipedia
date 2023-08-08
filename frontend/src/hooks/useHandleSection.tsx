import { useEffect } from "react"
import { useAppContext } from "./useAppContext"

interface Props {
    section: string
}

export const useHandleSection = ({ section }: Props) => {
    const { toggleSection } = useAppContext()
    
    useEffect(() => {
        toggleSection(section)
    }, [])

    return {}
}