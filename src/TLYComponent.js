import React, { Component } from 'react';

class TLYComponent extends Component {
    componentDidMount() {
        if (this.isSafari()) return;
        this.deviceorientation();
    }

    deviceorientation = () => {
        window.addEventListener('deviceorientation', (event) => {
            document.getElementById('alpha').innerHTML = `X：${event.alpha}`
            document.getElementById('beta').innerHTML = `Y：${event.beta}`
            document.getElementById('gamma').innerHTML = `Z：${event.gamma}`
            // document.getElementById("heading").innerHTML = `指北针指向：${event.webkitCompassHeading}度`;  
            // document.getElementById("accuracy").innerHTML = `指北针精度：${event.webkitCompassAccuracy}度`;
        }, false);
    }

    isSafari = () => {
        return /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    }

    requestPermission = () => {
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        alert('授权成功')
                        this.deviceorientation();
                    }
                })
                .catch(console.error);
        } else {
            alert('handle regular non iOS 13+ devices')
        }
    }

    render() {
        return (
            <div style={{ padding: 10 }}>

                {
                    this.isSafari() && <>ios13+需授权，ios13以下无法获取陀螺仪信息<br/>
                    <button onClick={this.requestPermission}>授权</button></>
                }
                <h4 id='alpha'></h4>
                <h4 id='beta'></h4>
                <h4 id='gamma'></h4>
                <h4 id='heading'></h4>
                <h4 id='accuracy'></h4>
            </div>
        )
    }
}

export default TLYComponent;