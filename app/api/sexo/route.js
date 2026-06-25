import { NextResponse } from 'next/server';
import SexoModel from '../../../models/sexoModel';

export async function GET() {
  try {
    const sexo = await SexoModel.getAll();
    return NextResponse.json(sexo);
  } catch (error) {
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
      { message: 'Sexo creado' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}