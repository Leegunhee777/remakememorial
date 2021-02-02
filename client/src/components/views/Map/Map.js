import React from 'react'
import './Map.css';
import {useState,useEffect} from 'react';
import { useDispatch,useSelector } from "react-redux";
import {mapclick} from '../../../_actions/dial_actions';
import Addmemorial from './Section/Addmemorial';
const { kakao } = window;

function Map() {
    const dispatch = useDispatch(); //함수형 안에서 선언해줘야함
    const user = useSelector(state=> state.map)

    const [a, seta]= useState('');

    useEffect(()=>{
        setmap();
    },[])

    useEffect(()=>{
        console.log(user.isShow);
    },[user])


    function setmap(){
        var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        var options = { //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        level: 3 //지도의 레벨(확대, 축소 정도)
        };
    
    var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    
    kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
        // 클릭한 위도, 경도 정보를 가져옵니다 
        //console.log(mouseEvent.latLng);
         var a  = mouseEvent.latLng;
         console.log(a);
         console.log(a.La); //위도
         console.log(a.Ma); //경도
         seta(a.La);
       dispatch(mapclick(true));
    });
    }
    
        return (
            
        <div className="box">
             {user.isShow && <Addmemorial a={a}/>}
            <div className ="container">
                <div className = "map" id="map" >
                
                    </div>
                
               
                <div className = "dot">
                2
                </div>
            </div>
            <div className = "course">
                가나다
            </div>
        </div>
    )
}

export default Map



