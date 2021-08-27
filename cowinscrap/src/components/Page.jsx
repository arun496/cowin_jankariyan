import React, { useEffect } from 'react'

export default function Page() {

    useEffect(() => {
        console.log('In effect');
        fetch("/vaccination/data/arun1091.in@gmail.com", {
            mode: "no-cors",
        })
        .then(res => res.text())
        .then(data => console.log(data))
    }, [])

    return (
        <h1>
            Hello React
        </h1>
    )
}
