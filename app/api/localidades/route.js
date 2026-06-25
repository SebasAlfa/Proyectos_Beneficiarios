import { NextResponse } from 'next/server';
import LocalidadModel from '../../../models/localidadModel';

export async function GET() {
  try {
    const localidades = await LocalidadModel.getAll();
    return NextResponse.json(localidades);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener localidades' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { Cod_localidad, Localidad } = await request.json();

    await LocalidadModel.create(
      Cod_localidad,
      Localidad
    );

    return NextResponse.json(
      { message: 'Localidad creada con éxito' },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}