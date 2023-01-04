# mobile_gps_gyroscope_demo
1. 高德地图定位出现偏移
2. ios13+获取陀螺仪信息需要授权
3. 为了信息安全，需使用https协议
```sh
// 高德地图
        AMapLoader.load({
            key: [高德key], //需要设置您申请的key
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
```

```sh
// 百度地图
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
```

```sh
// 陀螺仪
// ios13+需授权
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
        
 // 监听设备方向事件
        window.addEventListener('deviceorientation', (event) => {
            document.getElementById('alpha').innerHTML = `X：${event.alpha}`
            document.getElementById('beta').innerHTML = `Y：${event.beta}`
            document.getElementById('gamma').innerHTML = `Z：${event.gamma}`
        }, false);
```
