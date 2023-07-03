import { useEffect, useState } from "react"

export default function useFetchData (url) {
    const [data, setData] = useState (null)
    const [error, setError] = useState (null)

    useEffect ( () => {
        const getData = async () => {
            try{
                const response  = await fetch(url)
                const responseData = await response.json()
                setData(responseData)
            } catch (error) {
                console.log("Error encounted:", error.message)
                setError(error)
            }
        }
        getData()
    }, [url])
    return {data, error}
}