import React, { Component } from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';
import './MapContainer.css';

class MapComponent extends Component {
    // 2.dom渲染成功后进行map对象的创建
    componentDidMount() {
        AMapLoader.load({
            key: '0453040a9b38e88e819ff8ed3ac82b3a', //需要设置您申请的key
        }).then((AMap) => {
            var map = new AMap.Map('container', {
                resizeEnable: true
            });

            AMap.plugin('AMap.Geolocation', function () {
                var geolocation = new AMap.Geolocation({
                    enableHighAccuracy: true,//是否使用高精度定位，默认:true
                    timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                    maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                    convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                    showButton: true,        //显示定位按钮，默认：true
                    buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
                    buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                    showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                    showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                    panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                    zoomToAccuracy: true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                })

                map.addControl(geolocation);

                geolocation.getCurrentPosition(function (status, result) {
                    if (status === 'complete') {
                        document.getElementById('status').innerHTML = '定位成功'
                        var str = [];
                        str.push('定位结果：' + result.position);
                        str.push('定位类别：' + result.location_type);
                        if (result.accuracy) {
                            str.push('精度：' + result.accuracy + ' 米');
                        }//如为IP精确定位结果则没有精度信息
                        str.push('是否经过偏移：' + (result.isConverted ? '是' : '否'));
                        document.getElementById('result').innerHTML = str.join('<br>');
                    } else {
                        document.getElementById('status').innerHTML = '定位失败'
                        document.getElementById('result').innerHTML = '失败原因排查信息:' + result.message + '</br>浏览器返回信息：' + result.originMessage;
                    }
                });
            })


        }).catch(e => {
            console.log(e);
        })
    }

    render() {
        // 1.创建地图容器
        return (
            <div className="home_div">
                <div style={{ zIndex: 2, background: 'white', width: 350, height: 150, position: 'absolute', right: 10, top: 10, padding: 10 }}>
                    <h4 id="status"></h4>
                    <p id="result"></p>
                </div>
                <div id="container" className="container" style={{ height: '100%' }} />
            </div >
        );
    }

}
export default MapComponent;


