import { useMap } from "react-leaflet";

import { useEffect } from "react";

export const ResizeHandler = () => {
    const map = useMap();
    const container = map.getContainer();

    useEffect(() => {
        const observer = new ResizeObserver(() => {
            map.invalidateSize();
        });
        observer.observe(container);
        return () => observer.disconnect();
    }, [map, container]);

    return null;
};