
// Creamos la interfece para la primera interaccion con la API para obtener los lugares de interes  

// Interfaz para una característica individual
export interface Feature {
    type: string; // "Feature"
    id: string;
    geometry: Geometry;
    properties: FeatureProperties;
  }
  
  // Interfaz para la geometría de una característica
  export interface Geometry {
    type: string; 
    coordinates: number[]; 
  }
  
  // Interfaz para las propiedades de una característica
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
  
  // Creamos la interfece para la segunda interaccion con la API para obtener los lugares de interesel detalle de cada lugar en base al xid unico.
  export interface respuestaWSxid {
      xid: string; // Identificador único (xid)
      name?: string; // Nombre del lugar
      address?: {
        city?: string; // Ciudad
        state?: string; // Estado o provincia
        county?: string; // Municipio o distrito
        country?: string; // País
        pedestrian?: string; // Dirección detallada
        country_code?: string; // Código de país
        city_district?: string; // Distrito de la ciudad
      };
      rate?: string; // Calificación (en estrellas)
      osm?: string; // Identificador de OpenStreetMap
      bbox?: {
        lon_min?: number; // Longitud mínima del cuadro delimitador
        lon_max?: number; // Longitud máxima del cuadro delimitador
        lat_min?: number; // Latitud mínima del cuadro delimitador
        lat_max?: number; // Latitud máxima del cuadro delimitador
      };
      wikidata?: string; // Identificador de Wikidata
      kinds?: string[]; // Categorías del lugar
      sources?: {
        geometry?: string; // Origen de los datos geométricos
        attributes?: string[]; // Fuentes de atributos
      };
      otm?: string; // URL de la tarjeta de OpenTripMap
      wikipedia?: string; // URL de la página de Wikipedia
      image?: string; // URL de la imagen principal
      preview?: {
        source?: string; // URL de la imagen de vista previa
        height?: number; // Altura de la imagen de vista previa
        width?: number; // Ancho de la imagen de vista previa
      };
      wikipedia_extracts?: {
        title?: string; // Título del extracto de Wikipedia
        text?: string; // Texto del extracto de Wikipedia
        html?: string; // HTML del extracto de Wikipedia
      };
      point?: {
        lon?: number; // Longitud del punto central
        lat?: number; // Latitud del punto central
      };
    }