import React from 'react'
import { Button, Modal } from "flowbite-react";
import { useState } from 'react';
import { MdOutlineAddReaction } from "react-icons/md";
import ModalSearch from './ModalSearch';
import ModalList from './ModalList';

function GroupAddUser() {

    const [visible, setVisible] = useState(false)

    return (
        <div>
            <React.Fragment>
                <button onClick={() => setVisible(true)}>
                    <div className='w-full h-8 flex flex-row justify-center items-center text-green-500 dark:text-green-400 rounded-lg hover:cursor-pointer'>
                        <div className='flex justify-center items-center mr-3'>
                            <MdOutlineAddReaction className="h-6 w-6" />
                        </div>
                        <p className='font-semibold'>Add participant</p>
                    </div>
                </button>
                <Modal
                    show={visible}
                    onClose={() => setVisible(false)}
                    size="4xl"
                >
                    <Modal.Header>
                        Add participant the group
                    </Modal.Header>
                    <Modal.Body>
                        <ModalSearch></ModalSearch>
                        <ModalList></ModalList>
                    </Modal.Body>

                </Modal>
            </React.Fragment>
        </div>
    )
}

export default GroupAddUser