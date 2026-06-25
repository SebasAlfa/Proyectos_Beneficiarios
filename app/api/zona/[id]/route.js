import { NextResponse } from 'next/server';
import ZonaModel from '../../../../models/zonaModel';

export async function PUT(request, { params }) {
  try {
    const { id } = await params;

    const { ZONA_COLEGIO_GRADUACION_MEDIA } =
      await request.json();

    await ZonaModel.update(
      id,
      ZONA_COLEGIO_GRADUACION_MEDIA
    );

    return NextResponse.json({
      message: 'Zona actualizada'
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

    await ZonaModel.delete(id);

    return NextResponse.json({
      message: 'Zona eliminada'
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}