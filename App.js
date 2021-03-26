'use strict';
import React, { PureComponent } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { NativeModules } from 'react-native';
import { getPixelRGBA } from 'react-native-get-pixel';



const {width,height} = Dimensions.get("window")



const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text>Waiting</Text>
  </View>
);


function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export default class ExampleApp extends PureComponent {
  state = {
    capturedPhoto : null,
    visible : false,
    color : "white"
  }

  setColor = async(camera) => {
    const options = { quality: 1, base64: true, imageType : 'jpg' };
    const data = await this.camera.takePictureAsync(options);
    //  eslint-disable-next-line
    console.log(data.uri)
    this.setState({
      capturedPhoto :  data.uri,
    })

    console.log("Image height is : ",data.height)
    console.log("Window height is : ",height)
    console.log("Image width is : ",data.width)
    console.log("Window width is : ",width)

    getPixelRGBA(data.base64, data.width/2, data.height/2)
   .then(color => {
     console.log("Color is ",color)
     this.setState({
       color : `rgb(${color[0]},${color[1]},${color[2]})`
     })
     console.log(this.state.color)
    }) // [243, 123, 0]
   .catch(err => {
     console.log("Color is S",err)
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          autoFocus={true}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          cameraViewDimensions={{width : width/2,height : height/2}}
          autoFocusPointOfInterest = {{x : height/2, y : width/2}}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onTap={() => this.setColor(this)}
          ref={ref =>  this.camera = ref}
        >
          {({ camera, status }) => {
            if (status !== 'READY') return <PendingView />;
            return (
              <>
              <View style={{ flex: 0, justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => this.takePicture(camera)} style={{...styles.capture,backgroundColor:this.state.color}}>
                  <Text style={{ fontSize: 14 }}> SNAP </Text>
                </TouchableOpacity>

                {/* this is our central circle */}
              </View>
              </>
            );
          }}
        </RNCamera>

        {this.state.capturedPhoto &&
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.visible}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 20 }}>
            <TouchableOpacity style={{ margin: 10 }} onPress={() => this.setState({visible : false})}>
              <Text name="window-close" size={50} color="red">X</Text>
            </TouchableOpacity>

            <Image
              style={{ width: '100%', height: 300, borderRadius: 20 }}
              source={{ uri: this.state.capturedPhoto }}
            />
          <TouchableOpacity style={{
            backgroundColor : this.state.color,
            padding : 10
          }} >
            <Text>COLOR</Text>
          </TouchableOpacity>
          </View>
      </Modal>}

      <View
              style={{
                padding : 50,
                borderRadius : 100/2,
                borderColor : "white",
                borderWidth : 5,
                zIndex : 10,
                alignSelf : 'center',
                position : "absolute",
                top : height/2
              }}
            >
              <View
                style={{
                  padding : 5,
                  borderRadius : width/2,
                  zIndex : 10,
                  alignSelf : 'center',
                  backgroundColor : "white"
                }}
              >

              </View>
            </View>

      </View>
    );
  }

  takePicture = async function(camera) {
    const options = { quality: 0.5, base64: true, imageType : 'jpg' };
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line
    console.log(data.uri)
    this.setState({
      capturedPhoto :  data.uri,
      visible : true
    })

    console.log("Image height is : ",data.height)
    console.log("Window height is : ",height)
    console.log("Image width is : ",data.width)
    console.log("Window width is : ",width)

    getPixelRGBA(data.base64, data.width/2, data.height/2)
   .then(color => {
     console.log("Color is ",color)
     this.setState({
       color : `rgb(${color[0]},${color[1]},${color[2]})`
     })
     console.log(this.state.color)
    }) // [243, 123, 0]
   .catch(err => {
     console.log("Color is S",err)
    });
    

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

