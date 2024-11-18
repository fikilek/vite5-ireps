import {useState} from 'react'
import { BarcodeScanner } from "react-barcode-qrcode-scanner";
// import { TextResult } from "dynamsoft-javascript-barcode";

const licenceKey = 'DLS2eyJoYW5kc2hha2VDb2RlIjoiMTAzMTI0NTg3LVRYbFhaV0pRY205cSIsIm1haW5TZXJ2ZXJVUkwiOiJodHRwczovL21kbHMuZHluYW1zb2Z0b25saW5lLmNvbSIsIm9yZ2FuaXphdGlvbklEIjoiMTAzMTI0NTg3Iiwic3RhbmRieVNlcnZlclVSTCI6Imh0dHBzOi8vc2Rscy5keW5hbXNvZnRvbmxpbmUuY29tIiwiY2hlY2tDb2RlIjotMTk4MzIwOTU1Nn0='

const TonyBarcodeReader = () => {
  const [isActive,setIsActive] = useState(true); //whether the camera is active
  const [isPause,setIsPause] = useState(false); //whether the video is paused
  const [runtimeSettings,setRuntimeSettings] = useState("{\"ImageParameter\":{\"BarcodeFormatIds\":[\"BF_QR_CODE\"],\"Description\":\"\",\"Name\":\"Settings\"},\"Version\":\"3.0\"}"); //use JSON template to decode QR codes only
  const onOpened = (cam,camLabel) => { // You can access the video element in the onOpened event
    console.log("opened"); 
  }

  const onClosed = () => {
    console.log("closed");
  }
  
  const onDeviceListLoaded = (devices) => {
    console.log(`devices`,devices);
  }
  
  const onScanned = (results) => { // barcode results
    console.log(results);
  }
  
  const onClicked = (result) => { // when a barcode overlay is clicked
    alert(result.barcodeText);
  }

  const onInitialized = () => { // when the Barcode Reader is initialized
    setInitialized(true);
  }
  
  return (
    <div>
      <BarcodeScanner 
        isActive={isActive}
        isPause={isPause}
        license={licenceKey}
        drawOverlay={true}
        desiredCamera="front"
        desiredResolution={{width:1280,height:720}}
        runtimeSettings={runtimeSettings}
        onScanned={onScanned}
        onClicked={onClicked}
        onOpened={onOpened}
        onClosed={onClosed}
        onInitialized={onInitialized}
        onDeviceListLoaded={onDeviceListLoaded}
        facingMode='environment'
      >
      </BarcodeScanner>
    </div>
  )
}

export default TonyBarcodeReader
