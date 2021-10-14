/* cuando es ambiental */
export interface DetalleReclamo {
  IDDetalleReclamo?: number;
  descripcion?: string;
  direccion?: string;
  altura?: number;
  dominio?:string;
  ID_ReclamoAmbiental?: number;
  
  ID_Reclamo?:number;
}

/* cuando es vehicular */
export interface vehiculoXDetalle {
  IDVehiculoXDetalle?: number;
  ID_Vehiculo?: number;
  ID_DetalleReclamo?:number;
}
