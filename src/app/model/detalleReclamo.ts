/* cuando es ambiental */
export interface DetalleReclamo {
  IDDetalleReclamo?: number;
  descripcion?: string;
  direccion?: string;
  altura?: number;
  dominio?: string;
  ID_ReclamoAmbiental?: number;
  ID_Reclamo?: number;
}

/* cuando es vehicular */
export interface vehiculoXDetalle {
  IDVehiculoXDetalle?: number;
  ID_Vehiculo?: number;
  ID_DetalleReclamo?: number;
}

export interface DetalleReclamoActualizar {
  idDetalleReclamo: number;
  descripcion: string;
  altura: number;
  direccion: string;
  iD_Reclamo: number;
  fecha: string;
  hora: string;
  idSesion: number;
  nombre: string;
  idEstado: number;
  nombreTRec: string;
  idTipoRec: number;
  idRecAmb: number;
  nombreRecAmbiental: string;
  dominio: null;
  nick: string;
  foto: string;
}
