import { NextResponse } from 'next/server';
import SexoModel from '../../../../models/sexoModel';

export async function PUT(request, { params }) {
  try {
    const { id } = await params;

    const { SEXOS } = await request.json();

    await SexoModel.update(
      id,
      SEXOS
    );

    return NextResponse.json({
      message: 'Sexo actualizado'
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    await SexoModel.delete(id);

    return NextResponse.json({
      message: 'Sexo eliminado'
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}