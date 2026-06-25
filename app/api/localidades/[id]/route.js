import { NextResponse } from 'next/server';
import LocalidadModel from '../../../../models/localidadModel';

export async function PUT(request, { params }) {
  try {
    const { id } = await params;

    const { CODLOC, LOCALIDAD } = await request.json();

    await LocalidadModel.update(
      id,
      CODLOC,
      LOCALIDAD
    );

    return NextResponse.json({
      message: 'Actualizada con éxito'
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    await LocalidadModel.delete(id);

    return NextResponse.json({
      message: 'Borrada con éxito'
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}