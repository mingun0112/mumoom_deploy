'use client'

import { useEffect, useState, useRef } from 'react';
import { MarkerClusterer } from "@googlemaps/markerclusterer";

import {
    APIProvider, Map, MapCameraChangedEvent, AdvancedMarker,
    Pin, useMap
} from '@vis.gl/react-google-maps';
import type {Marker} from '@googlemaps/markerclusterer';




const distanceInKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // km 단위
};


export async function loadPlace(lat: number, lng: number) {
    const res = await fetch(`/api/load_location?lat=${lat}&lng=${lng}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    if (res.ok){
        console.log("hi");
        const data = await res.json();
        return data;
    }
    return "error";
}



export default function CustomeMap() {

    type Poi ={ key: string, location: google.maps.LatLngLiteral }


    const [userCenter, setUserCenter] = useState<{ lat: number, lng: number } | null>(null);
    const [lastPosition, setLastPosition] = useState<{ lat: number, lng: number } | null>(null);
    const [textContent, setTextContent] = useState('위치 파악 중…');
    const [point, setPoint] = useState<Poi[] | null>(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setTextContent("browser doesn't offers this function")
        } else {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    setTextContent("현재 위치를 가져옴");
                    setUserCenter(pos);
                    setLastPosition(pos);  // 최초 위치 저장

                },
                () => {
                    setTextContent("현재 위치를 가져올 수 없음");
                }
            );
        }
    },[]);
    const PoiMarkers = (props: { pois: Poi[] }) => {
        const map = useMap();
        const [markers, setMarkers] = useState<{[key: string]: Marker}>({});
        const clusterer = useRef<MarkerClusterer | null>(null);

        // Initialize MarkerClusterer, if the map has changed
        useEffect(() => {
            if (!map) return;
            if (!clusterer.current) {
                clusterer.current = new MarkerClusterer({map});
            }
        }, [map]);

        // Update markers, if the markers array has changed
        useEffect(() => {
            clusterer.current?.clearMarkers();
            clusterer.current?.addMarkers(Object.values(markers));
        }, [markers]);

        const setMarkerRef = (marker: Marker | null, key: string) => {
            if (marker && markers[key]) return;
            if (!marker && !markers[key]) return;

            setMarkers(prev => {
                if (marker) {
                    return {...prev, [key]: marker};
                } else {
                    const newMarkers = {...prev};
                    delete newMarkers[key];
                    return newMarkers;
                }
            });
        };

        return (
            <>
                {props.pois.map( (poi: Poi) => (
                    <AdvancedMarker
                        key={poi.key}
                        position={poi.location}
                        ref={marker => setMarkerRef(marker, poi.key)}
                    >
                        <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
                    </AdvancedMarker>

                ))}
            </>
        );
    };

    const handleCameraChange = async (ev: MapCameraChangedEvent) => {
        const newCenter = ev.detail.center;
        console.log('📍 지도 중심 변경됨:', newCenter.lat, newCenter.lng);

        if (lastPosition) {
            const distance = distanceInKm(lastPosition.lat, lastPosition.lng, newCenter.lat, newCenter.lng);
            if (distance > 1) {
                try {
                    const places = await loadPlace(newCenter.lat, newCenter.lng);
                    const placepoi:Poi[] = places.map((p:any)=> ({
                        key:Math.random().toString(36).substring(2, 10),
                        location:{lat: p.lat, lng: p.lng},
                    }));
                    setPoint(placepoi);

                    console.log('근처 장소 데이터:', places);
                    // setPoint(places);
                    setLastPosition({ lat: newCenter.lat, lng: newCenter.lng }); // 마지막 위치 업데이트
                } catch (error) {
                    console.error('장소 로딩 실패:', error);
                }
            }
        }
    };


    return (
        // <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <div className='w-full h-full'>
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API} onLoad={() => console.log('Maps API has loaded.')}>
                {userCenter && (<Map
                    defaultZoom={15}
                    defaultCenter={userCenter}
                    mapId='b60b691782b3237'
                    onCameraChanged={handleCameraChange}
                >
                    {userCenter && (
                        <AdvancedMarker
                            key="current-location"
                            position={userCenter}>
                            <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
                        </AdvancedMarker>
                    )}
                    {point && <PoiMarkers pois={point} />}
                </Map>)}
            </APIProvider>
        </div>
        // </div>
    )
}