import { useState } from 'react';
import { BarcodeScanner } from 'react-barcode-detection';

const MyBarcode = () => {
  const [ data, setData ] = useState();
  return (
    <div className="QRScreen">
      <BarcodeScanner onData={setData} />
      <div className="data">{data}</div>
    </div>
  );
}

export default MyBarcode