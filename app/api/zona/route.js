import { NextResponse } from 'next/server';
import ZonaModel from '../../../models/zonaModel';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const buscar = searchParams.get('buscar');

    let zonas;

    if (buscar) {
      zonas = await ZonaModel.search(buscar);
    } else {
      zonas = await ZonaModel.getAll();
    }

    return NextResponse.json(zonas);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { ZONA_COLEGIO_GRADUACION_MEDIA } = await request.json();

    await ZonaModel.create(
      ZONA_COLEGIO_GRADUACION_MEDIA
    );

    return NextResponse.json(
      { message: 'Zona creada con éxito' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}