import { TextInput } from 'flowbite-react'
import React from 'react'
import { HiOutlineSearch } from "react-icons/hi";


function Search() {
    return (
        <div className='w-full flex items-center justify-center h-12 my-2'>
            <div style={{ backgroundColor: "#323237" }} className='w-5/6 p-1 rounded-lg'>
                <TextInput
                    style={{ backgroundColor: "#323237", border: "none", color: "white", fontSize: "13px", letterSpacing: "0.3px",paddingLeft:"45px" }}
                    id="small"
                    type="text"
                    sizing="sm"
                    placeholder="Call or start a new chat"
                    icon={HiOutlineSearch}
                />
            </div>
        </div>
    )
}

export default Search