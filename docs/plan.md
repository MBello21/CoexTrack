# Plan de Desarrollo: Visual GPS Tracker

**Fecha**: 2026-09-04  
**Rama**: `vehicles`  
**Estado del Repo**: 40 componentes TSX, arquitectura de features establecida  

---

## 📊 Análisis del Estado Actual

### Infraestructura Existente
- **Mapa Base**: Leaflet + React Leaflet (MapContainer, TileLayer, Polyline)
- **Datos de Telemetría**: 
  - WebSocket en tiempo real (VehiclesContext) con reconexión automática
  - Servicio API REST para histórico (`/telemetry/history`)
  - Estructura de tipos definida
- **Panel Lateral**: VehiclePanel con búsqueda y filtros básicos
- **Tabla de Vehículos**: VehiclesPage con paginación
- **Componentes UI**: BadgeStatus, VehicleIcon, CustomDropdown establecidos
- **Contexto**: VehiclesContext mantiene Map<device_id, Vehicle> + trail (max 50 puntos)

### Capacidades Actuales
✅ Renderizado de marcadores en tiempo real  
✅ Vuelo a vehículos seleccionados (FlyToHandler)  
✅ Historial de ruta básico (polyline estática)  
✅ Panel de detalles del vehículo (popup)  
✅ Información de telemetría (velocidad, estado, batería)  

### Brechas Identificadas
- ❌ Dashboard de telemetría (sin gráficos, sin estadísticas)
- ❌ Visualización de rutas avanzada (sin animación, sin filtros temporales)
- ❌ Capas del mapa personalizadas (sin satélite, sin sin mapas alternativos)
- ❌ Geofences visuales en mapa
- ❌ Heatmap de velocidades
- ❌ Comparación multi-vehículo side-by-side
- ❌ Exportación de rutas/reportes

---

## 🔌 Arquitectura de Datos: WebSocket + REST

### Flujo de Datos Actual
```
Backend (GPS devices)
    ↓
    ├─→ WebSocket stream (tiempo real)
    │    ↓
    │    VehiclesContext (Map<device_id, Vehicle>)
    │    ↓
    │    Trail circular (max 50 puntos)
    │
    └─→ REST API /telemetry/history (histórico)
         ↓
         Fetchable on-demand
```

### Implicaciones para las Fases
- **Fase 1-2**: Usan datos WebSocket en tiempo real (sin latencia)
- **Fase 3 (Timeline)**: 
  - Hoy/ahora: WebSocket + telemetry-cache.service (360 puntos ~ 1h)
  - Días anteriores: REST API `/telemetry/history` (todo el día)
- **Fase 4**: Análisis geoespacial sobre histórico REST o stream WebSocket según contexto

---

## 🎯 Fases Incrementales (Básico → Complejo)

### ✨ Fase 1: Fundación Mapa Mejorada (Semana 1-2)
**Objetivo**: Mapa robusto con capas y controles básicos  
**Dependencias**: Ninguna  
**Complejidad**: ⭐⭐ (Bajo)

#### Tareas
1. **Capas de Mapa**
   - [ ] Agregar OpenerStreetMap (actual)
   - [ ] Agregar Satellite layer
   - [ ] Agregar Dark mode layer
   - [ ] Selector visual de capas (LayersControl)
   - **Componente**: `src/features/tracking/components/MapLayerSelector.tsx`

2. **Controles del Mapa**
   - [ ] Zoom + / - (controles personalizados)
   - [ ] Ubicación actual (geolocación)
   - [ ] Escala visual
   - [ ] Reset de vista (volver a centro)
   - **Componente**: `src/features/tracking/components/MapControls.tsx`

3. **Mejora de Marcadores**
   - [ ] Icono mejorado con dirección (rotación según curso)
   - [ ] Sombra de accuracy (círculo de incertidumbre GPS)
   - [ ] Popup mejorado al click
   - **Componente**: `src/features/tracking/components/VehicleMarker.tsx` (refactorizar)

4. **Visualización Base de Ruta**
   - [ ] Cargar historial de ruta para vehículo seleccionado
   - [ ] Polyline con degradado de color (antiguo → reciente)
   - [ ] Puntos de inicio/fin marcados
   - **Componente**: `src/features/tracking/components/RoutePolyline.tsx`

#### Archivos de Configuración
- **Crear**: `src/shared/constants/map-layers.ts` (URLs, estilos por capa)
- **Crear**: `src/features/tracking/types/map.types.ts` (LayerConfig, MapState)
- **Modificar**: `src/features/tracking/components/Map.tsx` (agregar controlador de capas)

---

### 📈 Fase 2: Dashboard de Telemetría (Semana 2-3)
**Objetivo**: Gráficos, estadísticas y KPIs de vehículos  
**Dependencias**: Fase 1 (opcional)  
**Complejidad**: ⭐⭐⭐ (Medio)

#### Tareas
1. **Componente Dashboard Raíz**
   - [ ] Panel flotante derecha (mirror del panel izquierdo)
   - [ ] Tabs: Overview / Estadísticas / Alertas / Historial
   - [ ] Cerrable/minimizable
   - **Componente**: `src/features/tracking/components/TelemetryDashboard.tsx`

2. **Tab 1: Overview del Vehículo Seleccionado**
   - [ ] Ficha de datos principal (placa, driver, estado, ubicación)
   - [ ] Velocidad actual (gran número + gráfica de últimas 10 min)
   - [ ] Batería (% + voltaje)
   - [ ] Ignición (on/off)
   - [ ] Timestamp de última actualización + indicador de conexión WebSocket
   - **Componente**: `src/features/tracking/components/telemetry/OverviewCard.tsx`

3. **Tab 2: Estadísticas (Gráficos)**
   - [ ] Gráfica de velocidad (últimas ~10 min desde WebSocket)
   - [ ] Gráfica de altitud (últimas ~10 min desde WebSocket)
   - [ ] Aceleración/desaceleración (calculada en tiempo real)
   - [ ] Consumo de batería (tendencia desde histórico circular)
   - **Librería**: Recharts (ligero, React-friendly)
   - **Fuente de datos**: telemetry-cache.service (sincronizado con WebSocket)
   - **Componentes**: 
     - `src/features/tracking/components/telemetry/SpeedChart.tsx`
     - `src/features/tracking/components/telemetry/BatteryChart.tsx`
     - `src/features/tracking/components/telemetry/AltitudeChart.tsx`

4. **Tab 3: Alertas**
   - [ ] Log de alertas del vehículo
   - [ ] Filtro por tipo (speedLimit, geofence, battery, etc.)
   - [ ] Timestamp y descripción
   - **Componente**: `src/features/tracking/components/telemetry/AlertsLog.tsx`

5. **Tab 4: Historial de Posiciones**
   - [ ] Tabla de últimas 50 posiciones
   - [ ] Columnas: timestamp, lat/lon, velocidad, altitud, sats, hdop
   - [ ] Scroll infinito o paginación
   - **Componente**: `src/features/tracking/components/telemetry/PositionHistory.tsx`

#### Servicio de Datos
- **Crear**: `src/features/tracking/services/telemetry-cache.service.ts`
  - Caché en memoria sincronizado con WebSocket (VehiclesContext)
  - Histórico circular para gráficas: últimas 360 muestras ≈ 1h a actualizaciones cada ~10s
  - Subscriptor a VehiclesContext que agrega puntos al histórico cuando hay cambios
  - Persistencia temporal: localStorage para recuperarse ante refresh
  - **Nota**: Reutilizar VehiclesContext existente, no duplicar conexión WebSocket

#### Archivos de Configuración
- **Crear**: `src/features/tracking/types/dashboard.types.ts`
- **Crear**: `src/shared/constants/telemetry-limits.ts` (umbrales de alertas)

---

### 🗺️ Fase 3: Visualización Avanzada de Rutas (Semana 3-4)
**Objetivo**: Rutas interactivas, filtros temporales, comparación  
**Dependencias**: Fase 1  
**Complejidad**: ⭐⭐⭐⭐ (Alto)  
**Nota sobre datos**: Rutas del día actual usan WebSocket + telemetry-cache.service; rutas históricas (días anteriores) usan API REST `/telemetry/history`

#### Tareas
1. **Timeline de Ruta**
   - [ ] Slider temporal (inicio → fin del día)
   - [ ] Animación de ruta (reproducir movimiento)
   - [ ] Play/Pause/Reset
   - [ ] Velocidad de reproducción (1x, 2x, 5x)
   - [ ] Mostrar marcador en punto actual de reproducción
   - **Componente**: `src/features/tracking/components/RouteTimeline.tsx`
   - **Hook**: `src/features/tracking/hooks/useRouteAnimation.ts`

2. **Polyline Mejorada**
   - [ ] Gradient color (rojo=lento, azul=rápido)
   - [ ] Grosor variable (según velocidad)
   - [ ] Puntos de parada (velocidad ≈ 0 > 5 min)
   - [ ] Puntos de alerta destacados
   - **Componente**: `src/features/tracking/components/RoutePolylineAdvanced.tsx`

3. **Filtros de Ruta**
   - [ ] Rango de fechas (date picker)
   - [ ] Filtro por velocidad min/max
   - [ ] Filtro por tipo de evento (parada, aceleración, alerta)
   - [ ] Aplicar dinámicamente al mapa
   - **Componente**: `src/features/tracking/components/RouteFilters.tsx`

4. **Comparación Multi-Vehículo**
   - [ ] Selector de 2-3 vehículos
   - [ ] Rutas superpuestas con colores diferentes
   - [ ] Legend de vehículos
   - [ ] Estadísticas comparativas (distancia, duración, promedio de velocidad)
   - **Componente**: `src/features/tracking/components/RouteComparison.tsx`

5. **Exportación de Rutas**
   - [ ] Botón "Exportar ruta"
   - [ ] Formato: GeoJSON, KML, CSV
   - [ ] Incluir: posiciones, velocidades, timestamps
   - **Servicio**: `src/features/tracking/services/route-export.service.ts`

#### Archivos de Configuración
- **Crear**: `src/features/tracking/types/route.types.ts`
- **Crear**: `src/shared/constants/route-colors.ts` (paleta de gradientes)

---

### 🎨 Fase 4: Características Avanzadas (Semana 4-5)
**Objetivo**: UX premium, análisis profundo  
**Dependencias**: Fases 1-3  
**Complejidad**: ⭐⭐⭐⭐⭐ (Muy Alto)

#### Tareas
1. **Geofences Visualización**
   - [ ] Cargar geofences del servidor
   - [ ] Renderizar círculos/polígonos en mapa
   - [ ] Color diferente según tipo (ruta, zona roja, zona segura)
   - [ ] Popup con detalles al click
   - [ ] Indicador: "Dentro/Fuera de geofence"
   - **Componente**: `src/features/tracking/components/GeofenceOverlay.tsx`

2. **Heatmap de Velocidades**
   - [ ] Librería: Leaflet.heat
   - [ ] Superposición opcional en mapa
   - [ ] Mostrar áreas de congestión/paradas frecuentes
   - **Componente**: `src/features/tracking/components/VelocityHeatmap.tsx`

3. **Modo Comparación de Tiempo**
   - [ ] Seleccionar 2 rangos de fecha del mismo vehículo
   - [ ] Rutas lado-a-lado en mapas divididos
   - [ ] Estadísticas comparativas
   - **Componente**: `src/features/tracking/components/TimeComparisonView.tsx`

4. **Análisis de Conducción**
   - [ ] Score de conducción (0-100)
   - [ ] Métrica: aceleraciones bruscas, exceso de velocidad, distracciones
   - [ ] Gráfica de eventos por hora del día
   - **Componente**: `src/features/tracking/components/DrivingScoreCard.tsx`
   - **Servicio**: `src/features/tracking/services/driving-analysis.service.ts`

5. **Dashboard Multi-Vehículo**
   - [ ] Vista de "Flota" completa
   - [ ] Grid de tarjetas (velocidad, batería, estado)
   - [ ] Mapa con todos los vehículos
   - [ ] Filtros por estado/grupo
   - **Componente**: `src/features/tracking/components/FleetDashboard.tsx`

6. **Integración con Notificaciones**
   - [ ] Toast de eventos críticos (baja batería, geofence breach)
   - [ ] Sonido de alerta opcional
   - **Servicio**: `src/shared/services/notification.service.ts`

---

## 📋 Dependencias Externas Requeridas

### Ya Incluidas
- ✅ leaflet, react-leaflet (mapa base)
- ✅ react, react-router (framework)
- ✅ tailwindcss (estilos)

### A Agregar (por Fase)
| Paquete | Fase | Tamaño | Propósito |
|---------|------|--------|----------|
| `recharts` | 2 | 45kb | Gráficos interactivos |
| `date-fns` | 3 | 13kb | Manejo de fechas |
| `geojson` | 3 | tipos | Exportación de rutas |
| `leaflet.heat` | 4 | 4kb | Heatmaps |
| `turf` | 4 | 50kb | Análisis geoespacial |

---

## 🏗️ Estructura de Carpetas (Final)

```
src/features/tracking/
├── components/
│   ├── Map.tsx
│   ├── MapLayerSelector.tsx          [Fase 1]
│   ├── MapControls.tsx               [Fase 1]
│   ├── VehicleMarker.tsx             [Fase 1 refactor]
│   ├── RoutePolyline.tsx             [Fase 1]
│   ├── RoutePolylineAdvanced.tsx     [Fase 3]
│   ├── RouteTimeline.tsx             [Fase 3]
│   ├── RouteFilters.tsx              [Fase 3]
│   ├── RouteComparison.tsx           [Fase 3]
│   ├── TelemetryDashboard.tsx        [Fase 2]
│   ├── GeofenceOverlay.tsx           [Fase 4]
│   ├── VelocityHeatmap.tsx           [Fase 4]
│   ├── FleetDashboard.tsx            [Fase 4]
│   ├── telemetry/
│   │   ├── OverviewCard.tsx          [Fase 2]
│   │   ├── SpeedChart.tsx            [Fase 2]
│   │   ├── BatteryChart.tsx          [Fase 2]
│   │   ├── AltitudeChart.tsx         [Fase 2]
│   │   ├── AlertsLog.tsx             [Fase 2]
│   │   └── PositionHistory.tsx       [Fase 2]
│   └── vehicle-panel/ [existente]
│
├── services/
│   ├── telemetry-api.service.ts      [existente]
│   ├── telemetry-cache.service.ts    [Fase 2]
│   ├── route-export.service.ts       [Fase 3]
│   └── driving-analysis.service.ts   [Fase 4]
│
├── hooks/
│   ├── useVehiclePanel.ts            [existente]
│   └── useRouteAnimation.ts          [Fase 3]
│
├── types/
│   ├── telemetry.type.ts             [existente]
│   ├── map.types.ts                  [Fase 1]
│   ├── dashboard.types.ts            [Fase 2]
│   └── route.types.ts                [Fase 3]
│
└── constants/
    ├── map-layers.ts                 [Fase 1]
    ├── route-colors.ts               [Fase 3]
    └── telemetry-limits.ts           [Fase 2]
```

---

## 🎬 Flujo de Desarrollo Recomendado

### Por Semana
**Semana 1-2: Fase 1**
- Lunes: Capas + Controles del mapa
- Miércoles: Mejora de marcadores y polyline base
- Viernes: Testing, estabilización

**Semana 2-3: Fase 2**
- Lunes: Dashboard + Tab Overview
- Miércoles: Gráficos (Recharts)
- Viernes: Tabs Alertas + Historial

**Semana 3-4: Fase 3**
- Lunes: Timeline + Animación
- Miércoles: Filtros + Comparación
- Viernes: Exportación

**Semana 4-5: Fase 4**
- Lunes: Geofences
- Miércoles: Heatmap + Análisis
- Viernes: Multi-vehículo + Notificaciones

### Testing por Fase
- [ ] **Fase 1**: Mapa renderiza sin lag, capas cambian sin reinicio
- [ ] **Fase 2**: Gráficos actualizan en tiempo real, sin bloqueos UI
- [ ] **Fase 3**: Animación suave a 30fps, exportación válida
- [ ] **Fase 4**: Todos los componentes coexisten sin conflictos CSS

---

## ⚠️ Riesgos & Mitigaciones

| Riesgo | Impacto | Mitigación |
|--------|---------|-----------|
| Mapa lento con muchos vehículos | Alto | Virtualización de marcadores, clustering |
| Gráficos jeringuizan en renders | Alto | Memoización, debounce de updates, useDeferredValue |
| Pérdida de datos WebSocket | Medio | Reconexión automática (ya implementada, 4.5s), sync con localStorage |
| Memoria crece infinitamente | Medio | Histórico circular (360 puntos), limpieza de trail del VehicleContext |
| Exportación de rutas grandes | Medio | Limitar a 1000 puntos, worker thread |
| Compatibilidad de navegadores | Bajo | Testing en Chrome, Firefox, Safari |

---

## 📊 Métricas de Éxito

- ✅ Mapa carga < 2s, scroll sin lag (Fase 1)
- ✅ Dashboard actualiza en tiempo real (WebSocket) sin UI freeze (Fase 2)
- ✅ Latencia E2E vehículo → pantalla < 2s (Fase 2)
- ✅ Animación de ruta 30fps+ en 1000+ puntos (Fase 3)
- ✅ Geofences no causen lag visible en mapa (Fase 4)
- ✅ Memoria estable: no supera 150MB con 100+ vehículos + 1h histórico
- ✅ 0 console errors en demo

---

## 🔗 Referencias

- Leaflet Docs: https://leafletjs.com/
- React Leaflet: https://react-leaflet.js.org/
- Recharts: https://recharts.org/
- Turf.js: https://turfjs.org/
- GeoJSON Spec: https://geojson.org/

---

**Estado**: ✍️ Borrador  
**Última actualización**: 2026-09-04  
**Propietario**: Equipo Frontend  
