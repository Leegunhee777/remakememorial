import React from "react";
import "./Map.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mapclick } from "../../../_actions/dial_actions";
import Addmemorial from "./Section/Addmemorial";
import axios from "axios";
import { resolveOnChange } from "antd/lib/input/Input";

const { kakao } = window;
var latlng = "";
const CategoryOption = [
  { value: 0, label: "카테고리" }, //이런형식으로 select써야함
  { value: 1, label: "데이트" },
  { value: 2, label: "맛집" },
  { value: 3, label: "여행" },
  { value: 4, label: "업무" },
];

function Map() {
  const dispatch = useDispatch(); //함수형 안에서 선언해줘야함
  const user = useSelector((state) => state.map);

  const [wedo, setwedo] = useState("");
  const [kungdo, setkungdo] = useState("");
  const [memo, setmemo] = useState([]);
  const [searchCate, setsearchCate] = useState("");

  useEffect(() => {
    axios.get("/api/memo/get").then((response) => {
      if (response.data.success) {
        setmemo(memo.concat(response.data.doc));
      } else {
        alert("Failed to get Videos");
      }
    });
  }, []);

  useEffect(() => {
    setmap(memo);
  }, [memo]);

  function setmap(memo) {
    console.log(memo);
    var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    var options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 8, //지도의 레벨(확대, 축소 정도)
    };

    var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    var marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(33.470701, 126.570667),
    });

    /*
    var marker2 = new kakao.maps.Marker({
        map: map, 
        position: new kakao.maps.LatLng(33.460701, 126.570667)
    });
*/

    for (var i = 0; i < memo.length; i++) {
      console.log(`위도${memo[i].wedo}`);
      console.log(`경도:${memo[i].kungdo}`);
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(memo[i].kungdo, memo[i].wedo),
      });

      var content = `<div class='main'>
    <div class='info'>
        <div class='title'>
        ${
          memo[i].hasOwnProperty("category")
            ? "<" + memo[i].category + ">"
            : null
        }
        ${memo[i].hasOwnProperty("title") ? memo[i].title : null}
       
        </div>
        <div class='body'>
        <img src= http://localhost:5000/${
          memo[i].filePath
        } width="60" height="60" style="margin-left:5%"/>
        </div>
        </div>
    <div>`;

      var overlay = new kakao.maps.CustomOverlay({
        content: content,
        map: map,
        position: marker.getPosition(),
      });
    }

    function closeOverlay() {
      overlay.setMap(null);
    }

    kakao.maps.event.addListener(marker, "click", function () {
      overlay.setMap(map);
    });

    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      // 클릭한 위도, 경도 정보를 가져옵니다
      //console.log(mouseEvent.latLng);
      latlng = mouseEvent.latLng;
      // console.log(a);
      // console.log(a.La); //위도
      // console.log(a.Ma); //경도
      console.log(latlng.La);
      setwedo(latlng.La);
      setkungdo(latlng.Ma);
      dispatch(mapclick(true));
    });
  }

  const onCategoryChange = (e) => {
    setsearchCate(e.currentTarget.value);
  };

  const filteredcomponents = (data) => {
    if (searchCate == "카테고리") setsearchCate("");
    data = data.filter((item) => {
      return item.category.indexOf(searchCate) > -1;
    });
    return data.map((x, index) => (
      <img
        key={index}
        style={{ maxWidth: "200px" }}
        src={`http://localhost:5000/${x.filePath}`}
        alt="img"
      />
    ));
  };

  const refreshFunction = (newmemo) => {
    //refreshFunction을 이용하여 실시간 처럼 댓글이 추가되게 할수있음, (새로고침없이도)
    setmemo(memo.concat(newmemo)); //댓글이 submit되고->DB에 댓글이 추가되고,->DB에서 새롭게 갱신된 디비값을가져와->newComment이게 디비에서 가져온값임
    // refreshFunction을 호출하여, State변수인 Comments를 업데이트해준다.<Comment.js의 onsubmit함수참고>
  };
  return (
    <div className="box">
      {user.isShow && (
        <Addmemorial
          wedo={wedo}
          kungdo={kungdo}
          refreshFunction={refreshFunction}
        />
      )}
      <div className="container">
        <div className="map" id="map"></div>

        <div className="dot">
          <select onChange={onCategoryChange}>
            {CategoryOption.map((item, index) => (
              <option key={index} valu={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <br />
          <br />
          {memo !== "" ? filteredcomponents(memo) : null}
        </div>
      </div>
      <div className="course">가나다</div>
    </div>
  );
}

export default Map;
