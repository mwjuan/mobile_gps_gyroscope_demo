import React, { Component } from 'react';
import { Map } from 'react-bmapgl';

class BMapComponent extends Component {
    componentDidMount() {
        if (!this.map) return;
        var map = this.map;
        var BMapGL = window.BMapGL;
        var geolocation = new BMapGL.Geolocation();
        var newpointx;
        var newpointy;
        geolocation.getCurrentPosition(function (data) {
            if (this.getStatus() === 0) {
                var marker = new BMapGL.Marker(data.point);
                map.addOverlay(marker);
                var label = new BMapGL.Label("", { offset: new BMapGL.Size(10, -10) });
                marker.setLabel(label); //添加百度label
                map.setCenter(data.point);
              
                newpointx = data.point.lng;
                newpointy = data.point.lat;
 
                // 创建地理编码实例      
                var myGeo = new BMapGL.Geocoder();
                // 根据坐标得到地址描述    
                myGeo.getLocation(new BMapGL.Point(newpointx, newpointy), function (result) {
                    if (result) {
                        //alert(result.address);
                        var addComp = result.addressComponents;
                        alert( addComp.province + addComp.city  + addComp.district + addComp.street + addComp.streetNumber);
                    }
                });
            }
            else {
                alert('failed' + this.getStatus());
            }
        });

    }

    setMap = (map) => {
        this.map = map;
    }

    render() {
        return (
            <Map
                style={{ height: '90vh' }}
                ref={ref => this.setMap(ref.map)}
                center={{ lng: 121.389183, lat: 31.166577 }}
                enableDoubleClickZoom={true}
                enableDragging={true}
                enableRotate={true}
                enableScrollWheelZoom={true}
                zoom={15}
            />
        )
    }
}

export default BMapComponent;