import { useState } from 'react';
import { Camera, CameraType, useCameraPermissions } from 'expo-camera';
// import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ExpoBarcodeScanner = () => {
  const [facing, setFacing] = useState('back');
  // const [permission, requestPermission] = useCameraPermissions();

  // if (!permission) {
  //   // Camera permissions are still loading.
  //   console.log(`Camera permissions are still loading.`)
  //   // return <View />;
  // }

  // if (!permission.granted) {
    // Camera permissions are not granted yet.
    // return (
      // console.log(`We need your permission to show the camera`)
        // <button onClick={requestPermission} >grant permission" </button>
    // );
  // }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <div >
      <Camera  facing={facing}>
        {/* <View style={styles.buttonContainer}> */}
          <button  onClick={toggleCameraFacing}>
            Flip Camera
          </button>
        {/* </View> */}
      </Camera>
    </div>
  );
}

export default ExpoBarcodeScanner

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   message: {
//     textAlign: 'center',
//     paddingBottom: 10,
//   },
//   camera: {
//     flex: 1,
//   },
//   buttonContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     backgroundColor: 'transparent',
//     margin: 64,
//   },
//   button: {
//     flex: 1,
//     alignSelf: 'flex-end',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'white',
//   },
// });
