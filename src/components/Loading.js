import { Spinner } from 'flowbite-react'
import React from 'react'

function Loading() {
    return (
        <div>
            <Spinner
                color="warning"
                aria-label="Warning spinner example"
                size="xl"
            />
        </div>
    )
}

export default Loading