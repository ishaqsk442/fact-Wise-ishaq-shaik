
import React, { useState, useRef } from 'react';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { RiDeleteBin6Line } from "react-icons/ri";
import { Toast } from 'primereact/toast';
// import { Button } from 'primereact/button';

import "primereact/resources/themes/lara-light-cyan/theme.css";

import './index.css'

const Confirm = (props) => {
    const{id,onRemoveItem }=props
    const [visible, setVisible] = useState(false);
    const toast = useRef(null);

    const accept = () => {
       
        onRemoveItem (id)
    }

    const reject = () => {
      
    }

    return (
        <>
            <Toast ref={toast} />
            <ConfirmDialog className="prompt-bg" group="declarative"  visible={visible} onHide={() => setVisible(false)} message="Are you sure you want to proceed?" 
                header="Confirmation" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
            
                <RiDeleteBin6Line onClick={() => setVisible(true)} icon="pi pi-check" className=' delete-icon edit-delete' />
           
        </>
    )
}

export default Confirm