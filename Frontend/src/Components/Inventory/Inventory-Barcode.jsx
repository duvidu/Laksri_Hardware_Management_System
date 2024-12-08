import React from "react";
import Barcode from 'react-barcode';

const BarcodeGenerator = (props) => {
    const pID = props.id;

    return ( 
        <div className='customized-barcode'>
            <Barcode value={pID} />
        </div>
    );
}

export default BarcodeGenerator;
