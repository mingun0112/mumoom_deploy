'use client'

import { useEffect, useState } from 'react';
// import { MarkerClusterer } from "@googlemaps/markerclusterer";

import {
    APIProvider, Map, MapCameraChangedEvent, AdvancedMarker,
    Pin
} from '@vis.gl/react-google-maps';
export default function CustomeMap() {
    const [center, setCenter] = useState({ lat: -33.860664, lng: 151.208138 });
    const [textContent, setTextContent] = useState('위치 파악 중…');
    // const markerCluster = new MarkerClusterer({ markers, map });

    useEffect(() => {
        if (!navigator.geolocation) {
            setTextContent("browser doesn't offers this function")
        } else {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCenter({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                    setTextContent("현재 위치를 가져옴");
                },
                () => {
                    setTextContent("현재 위치를 가져올 수 없음");
                }
            );
        }
    })


    return (
        // <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <div className='w-full h-full'>
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API} onLoad={() => console.log('Maps API has loaded.')}>
                {center && (<Map
                    defaultZoom={15}
                    mapId='b60b691782b3237'
                    defaultCenter={center}
                    onCameraChanged={(ev: MapCameraChangedEvent) =>
                        console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
                    }>
                    {center && (
                        <AdvancedMarker
                            key="current-location"
                            position={center}>
                            <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
                        </AdvancedMarker>
                    )}
                </Map>)}
            </APIProvider>
        </div>
        // </div>
    )
}