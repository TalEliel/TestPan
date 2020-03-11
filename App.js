import React, {Component} from 'react';
import {
  StyleSheet,
  StatusBar,
  Animated,
  PanResponder,
  Platform,
  View,
  Dimensions
} from 'react-native';
const {height, width} = Dimensions.get('screen');
export default class App extends Component { 
  constructor(){
    super();
    this.position = new Animated.ValueXY();
    this.PanResponder = PanResponder.create({
        onMoveShouldSetPanResponder: (evt, gestureState) => {
            const { dx, dy } = gestureState;
            return (dx < -10) || dx > 50;
        },
        onPanResponderMove: (evt, gestureState) => {
          this.position.setValue({ x: gestureState.dx, y: 0 });
        },
        onPanResponderEnd: (e, gestureState) => {
            let x = gestureState.dx;
            let y = gestureState.dy;
            if(Platform.OS == 'ios' && x < -30){
                this.onSwipePerformed('left');
            }
        },
        onPanResponderRelease: (evt, gestureState) => {
            let x = gestureState.dx;
            let y = gestureState.dy;
            if(Platform.OS == 'android'){
                if (Math.abs(x) > Math.abs(y)){
                    if (x >= 0) {
                        this.onSwipePerformed('right');
                        this.resetPosition(0, 0);
                    }
                    else if(x < height * 0.1){
                        this.position.setValue({ x: -width * 2, y: 0 });
                        this.onSwipePerformed('left');
                        this.resetPosition(0, 3000);
                    }
                    else{
                        this.resetPosition(300,0);
                    }
                }
                else {
                    this.resetPosition(0, 0);
                    if (y >= 0) {
                        this.onSwipePerformed('down')
                    }
                    else {
                        this.onSwipePerformed('up')
                    }
                }
            }            
        }
    })
  }

  onSwipePerformed = (action) => {
    /// action : 'left' for left swipe
    /// action : 'right' for right swipe
    /// action : 'up' for up swipe
    /// action : 'down' for down swipe
    switch(action){
      case 'left':{
        console.log('left')
        break;
      }
       case 'right':{
        console.log('right')
        break;
      }
       case 'up':{            
        break;
      }
       case 'down':{            
        break;
      }
       default : {
       console.log('Undeteceted action');
       }
    }
  }

  resetPosition = (duration, delay)=> {
    Animated.timing(this.position, {
      toValue: { x: 0, y: 0 },
      duration: duration,
      delay: delay
    }).start();
  }

  getEmbedStyle = () =>{
    const { position } = this;
    console.log(width)
    const translateX = position.x.interpolate({
        inputRange: [-width, 0, width],
        outputRange: [-width , 0, width]
    });
    const opacity = position.x.interpolate({
        inputRange: [-width * 0.75, 0],
        outputRange: [0, 1]
    });
    return{
        opacity,
        transform: [{translateX}]
    };
  }

  render(){
    return (
      <React.Fragment>
        <StatusBar hidden/>
        <View style={{flex: 1, backgroundColor: 'blue', justifyContent: 'center', alignItems:'center'}}>
          <Animated.View style={[{backgroundColor: 'red', width: '50%', height: '50%'}, this.getEmbedStyle()]} {...this.PanResponder.panHandlers}>
          </Animated.View>
        </View>
      </React.Fragment>
    
    );
  }
};

const styles = StyleSheet.create({
});
