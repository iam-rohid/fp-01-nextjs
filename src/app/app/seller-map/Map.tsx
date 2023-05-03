import L from "leaflet";
import "leaflet.markercluster";
import { useEffect, useRef } from "react";
import { range } from "@/utils/range";

import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet/dist/leaflet.css";
import "./map.css";
import { SellersResponse } from "./page";

export type Seller = {
  id: number;
  name: string;
  estimate_sales: number;
  latitude: number;
  longitude: number;
};

export type MapProps = {
  sellers: Seller[];
  onItemClick?: (seller: Seller) => void;
};

export default function Map({ sellers, onItemClick }: MapProps) {
  const mapDivRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapDivRef.current) return;
    mapRef.current = L.map(mapDivRef.current).setView([51.505, -0.09], 4);

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
          '<a href="https://carto.com/">CARTO</a>',
        minZoom: 3,
        maxZoom: 19,
      }
    ).addTo(mapRef.current);

    return () => {
      mapRef.current?.remove();
    };
  }, [mapDivRef, mapRef]);

  useEffect(() => {
    if (!mapRef.current) return;
    if (!sellers?.length) return;

    const sortedData = sellers.sort((a, b) =>
      (a.estimate_sales || 0) > (b.estimate_sales || 0) ? 1 : -1
    );

    let sum = 0;
    sortedData.forEach((seller) => {
      sum += seller.estimate_sales || 0;
    });
    const avg = sum / sellers.length;

    const markers = L.markerClusterGroup({
      animate: true,
      animateAddingMarkers: true,
      maxClusterRadius: 100,
      disableClusteringAtZoom: 8,
      spiderfyOnMaxZoom: true,
      spiderLegPolylineOptions: {
        className: "spider-leg-polyline",
      },
      iconCreateFunction: (cluster) => {
        const count = cluster.getChildCount();

        const iconSize = range(0, sortedData.length, 30, 100, count);
        return L.divIcon({
          html: count.toLocaleString(),
          className: "cluster-marker-icon",
          iconSize: [iconSize, iconSize],
        });
      },
    });

    sortedData.forEach((seller) => {
      const point = L.latLng(seller.latitude || 0, seller.longitude || 0);
      const iconSize = Math.max(
        10,
        Math.min(60, Math.round(((seller.estimate_sales || 0) * 40) / avg))
      );
      const marker = L.marker(point, {
        icon: L.divIcon({
          className: "seller-marker-icon",
          iconSize: [iconSize, iconSize],
        }),
      });
      const popupContent = `<div class='seller-marker-popup'>
        <p class='seller-marker-popup-name'>
        ${seller.name}
        </p>
        <p class='seller-marker-popup-sales'>
        $${(seller.estimate_sales || 0).toLocaleString()}
        </p>
      </div>`;
      marker.bindPopup(popupContent, {
        closeButton: false,
      });
      marker.on("mouseover", () => marker.openPopup());
      marker.on("mouseout", () => marker.closePopup());
      marker.on("click", () => onItemClick && onItemClick(seller));
      markers.addLayer(marker);
    });

    mapRef.current.addLayer(markers);

    return () => {
      mapRef.current?.removeLayer(markers);
    };
  }, [mapRef, sellers, onItemClick]);

  return <div ref={mapDivRef} className="absolute inset-0 z-0" />;
}
