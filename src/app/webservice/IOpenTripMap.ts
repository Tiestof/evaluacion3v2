
// Creamos la interfece para la primera interaccion con la API.
// para obtener los lugares de interes y el Xid  
export interface Feature {
    type: string; // "Feature"
    id: string;
    geometry: Geometry;
    properties: FeatureProperties;
  }
  
  export interface Geometry {
    type: string; 
    coordinates: number[]; 
  }
  
  export interface FeatureProperties {
    xid: string;
    name: string;
    highlighted_name: string;
    dist: number;
    rate: number;
    osm?: string; // Opcional
    wikidata?: string; // Opcional
    kinds: string[];
  }
  export interface respuestaWSSuggest2 {
    type: string; 
    features: Feature[];
  }
  
  // Creamos la interfece para la segunda interaccion con la API,
  // para obtener los lugares de interesel detalle de cada lugar en base al xid unico.
  export interface respuestaWSxid {
      xid: string; // Identificador único (xid)
      name?: string; // Nombre del lugar
      address?: {
        city?: string; 
        state?: string; 
        county?: string; 
        country?: string; // País
        pedestrian?: string; 
        country_code?: string; 
        city_district?: string; 
      };
      rate?: string; 
      osm?: string; 
      bbox?: {
        lon_min?: number; lon_max?: number; 
        lat_min?: number; lat_max?: number; 
      };
      wikidata?: string; 
      kinds?: string[]; 
      sources?: {
        geometry?: string; 
        attributes?: string[]; 
      };
      otm?: string; 
      wikipedia?: string; 
      image?: string; 
      preview?: {
        source?: string; // URL de la imagen de vista previa
        height?: number; 
        width?: number; 
      };
      wikipedia_extracts?: {
        title?: string; 
        text?: string; 
        html?: string; 
      };
      point?: {
        lon?: number;
        lat?: number;
      };
    }