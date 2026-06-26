import { NextResponse } from 'next/server';
import SexoModel from '../../../models/sexoModel';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const buscar = searchParams.get('buscar');

    let sexo;

    if (buscar) {
      sexo = await SexoModel.search(buscar);
    } else {
      sexo = await SexoModel.getAll();
    }

    return NextResponse.json(sexo);
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
    const { ID_SEXO, SEXOS } = await request.json();

    await SexoModel.create(
      ID_SEXO,
      SEXOS
    );

    return NextResponse.json(
      { message: 'Sexo creado correctamente' },
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