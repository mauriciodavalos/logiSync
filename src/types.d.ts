export interface APIResults {
  status: string;
  requestedAt: Date;
  results: number;
  data: Data;
}

export interface Data {
  rutas: Ruta[];
}

export interface Ruta {
  filter(
    arg0: (ruta: { startPoint: string; endPoint: string }) => boolean
  ): Ruta[];
  availability: boolean;
  _id: string;
  company: string;
  vehicleType: string;
  startPoint: string;
  endPoint: string;
  initialDate: Date;
  price: number;
  createdAt: Date;
}
