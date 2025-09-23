import React, { useEffect, useRef, useState } from "react";
import {
    PageWrap,
    Card,
    Title,
    Address,
    MapBox,
    Info,
    Label,
    Description,
    StatusMessage,
} from "./style";

const KAKAO_SCRIPT_ID = "kakao-maps-sdk";
const ADDRESS_TEXT = "경상남도 김해시 구산로5번길 3-26, 101호";
const ADDRESS_DETAIL = "(구산동, 행복백세)";

export default function OverviewMapPage() {
    const mapContainerRef = useRef(null);
    const [status, setStatus] = useState({ loading: true, error: "" });

    useEffect(() => {
        const appKey = import.meta.env.VITE_KAKAO_MAP_APP_KEY;
        if (!appKey) {
            setStatus({ loading: false, error: "카카오 지도 App Key(VITE_KAKAO_MAP_APP_KEY)가 설정되지 않았습니다." });
            return;
        }

        const existingScript = document.getElementById(KAKAO_SCRIPT_ID);
        const handleScriptLoad = () => {
            if (!window.kakao || !window.kakao.maps) {
                setStatus({ loading: false, error: "카카오 지도 SDK 로딩에 실패했습니다." });
                return;
            }
            window.kakao.maps.load(() => initMap());
        };

        if (existingScript) {
            if (window.kakao && window.kakao.maps) {
                handleScriptLoad();
            } else {
                existingScript.addEventListener("load", handleScriptLoad, { once: true });
                existingScript.addEventListener("error", () => {
                    setStatus({ loading: false, error: "카카오 지도 SDK 스크립트를 불러오지 못했습니다." });
                }, { once: true });
            }
            return;
        }

        const script = document.createElement("script");
        script.id = KAKAO_SCRIPT_ID;
        script.async = true;
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${appKey}&libraries=services`;
        script.addEventListener("load", handleScriptLoad, { once: true });
        script.addEventListener("error", () => {
            setStatus({ loading: false, error: "카카오 지도 SDK 스크립트를 불러오지 못했습니다." });
        }, { once: true });
        document.head.appendChild(script);

        return () => {
            script.removeEventListener("load", handleScriptLoad);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const initMap = () => {
        const { kakao } = window;
        if (!mapContainerRef.current) {
            setStatus({ loading: false, error: "지도를 표시할 DOM 요소를 찾을 수 없습니다." });
            return;
        }

        const defaultCenter = new kakao.maps.LatLng(35.228553, 128.889601);
        const map = new kakao.maps.Map(mapContainerRef.current, {
            center: defaultCenter,
            level: 3,
        });

        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(ADDRESS_TEXT, (result, statusCode) => {
            if (statusCode === kakao.maps.services.Status.OK) {
                const { x, y } = result[0];
                const coords = new kakao.maps.LatLng(y, x);
                map.setCenter(coords);

                const marker = new kakao.maps.Marker({
                    map,
                    position: coords,
                });

                const infoWindow = new kakao.maps.InfoWindow({
                    content: `\
<div style="padding:12px 16px; font-size:13px; font-weight:600; color:#0f172a;">\
  행복백세<br/><span style="font-weight:400; color:#334155;">${ADDRESS_TEXT}</span>\
</div>`
                });
                infoWindow.open(map, marker);
                setStatus({ loading: false, error: "" });
            } else {
                setStatus({ loading: false, error: "입력한 주소를 지도에서 찾을 수 없습니다." });
            }
        });
    };

    return (
        <PageWrap>
            <Card>
                <div>
                    <Title>오시는 길</Title>
                    <Address>
                        {ADDRESS_TEXT} {ADDRESS_DETAIL}
                    </Address>
                </div>

                <MapBox ref={mapContainerRef} id="kakao-map-container" aria-label="행복백세 위치 지도" />
                {status.error && <StatusMessage>{status.error}</StatusMessage>}

                <Info>
                    <Label>찾아오시는 길 안내</Label>
                    <Description>
                        카카오맵의 로드뷰 및 길찾기 기능을 활용하시면 더욱 편리하게 방문하실 수 있습니다.
                        주차 공간이 협소하므로 방문 전 연락을 부탁드립니다.
                    </Description>
                    {status.loading && !status.error && (
                        <Description>지도를 불러오고 있습니다...</Description>
                    )}
                </Info>
            </Card>
        </PageWrap>
    );
}

