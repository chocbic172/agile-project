import {useEffect, useRef} from "react"

import {Image as ImageLayer, Vector as VectorLayer} from "ol/layer"
import VectorSource from "ol/source/Vector"
import GeoJSON from 'ol/format/GeoJSON.js';
import Static from "ol/source/ImageStatic"
import {getCenter} from "ol/extent"
import {Projection} from "ol/proj"
import {Map, View} from "ol"

import prestonMapImg from './presonmap.png'
import prestonJson from './prestonmap.json'
import buildingData from './buildingData.json'

import 'ol/ol.css'
import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";
import {Building} from "../App.tsx";


const extent = [0, 0, 3270, 3776]

const projection = new Projection({
    code: 'preston-map',
    units: 'pixels',
    extent: extent,
})

interface PrestonMapProps {
    selectedCode: string,
    setSelectedCode: (newCode: string) => void,
    selectedBuilding: Building,
    setSelectedBuilding: (newBuilding: Building) => void,
}

export default function PrestonMap({
                                       selectedCode,
                                       setSelectedCode,
                                       setSelectedBuilding,
                                   }: PrestonMapProps) {
    const mapRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!mapRef.current) return

        const selectedStyle = new Style({
            stroke: new Stroke({
                color: 'rgba(200,20,20,0.8)',
                width: 2,
            }),
            fill: new Fill({
                color: 'rgba(200,20,20,0.4)',
            }),
        })

        const unselectedStyle = new Style({
            stroke: new Stroke({
                color: 'rgb(0, 0, 0, 0)',
                width: 1,
            }),
            fill: new Fill({
                color: 'rgba(20, 158, 200, 0.1)',
            }),
        })

        const vectorOverlay = new VectorSource({
            features: new GeoJSON().readFeatures(prestonJson)
        })

        const vectorLayer = new VectorLayer({
            source: vectorOverlay,
            style: (feature) => {
                if (feature.get('code') === selectedCode) {
                    return selectedStyle
                }
                return unselectedStyle
            }
        })

        const mapObj = new Map({
            view: new View({
                projection: projection,
                center: getCenter(extent),
                zoom: 1.25,
                minZoom: 0.8,
                maxZoom: 4.5,
            }),
            layers: [
                new ImageLayer({
                    source: new Static({
                        url: prestonMapImg,
                        projection: projection,
                        imageExtent: extent,
                    })
                }),
                vectorLayer,
            ],
        })

        mapObj.on('click', (event) => {
            vectorLayer.getFeatures(event.pixel).then((features) => {
                if (features.length) {
                    const selectedFeature = features[0]
                    const newCode = selectedFeature.get('code')
                    setSelectedCode(newCode)
                    vectorLayer.changed()

                    searchBuildingByCode(newCode).then((result) => {
                        if (result) {
                            setSelectedBuilding(result);
                        } else {
                            console.log('Building not found.');
                        }
                    });
                }
            })
        })

        mapObj.setTarget(mapRef.current)

        return () => mapObj.setTarget('')
    }, [setSelectedCode]);

    return <div className="map" ref={mapRef} style={{width: '100%', height: '70%'}}/>

    async function searchBuildingByCode(code: string) {
            const buildings: Record<string, Building> = buildingData;
            return buildings[code] || null;
    }
}

