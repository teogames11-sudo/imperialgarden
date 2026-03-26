import { NextResponse } from "next/server";

type OrderPayload = {
  name?: string;
  phone?: string;
  email?: string;
  comment?: string;
  items?: Array<{
    slug: string;
    quantity: number;
    title: string;
  }>;
};

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => null)) as OrderPayload | null;

  if (!payload?.name || !payload?.phone || !payload?.email) {
    return NextResponse.json(
      {
        error: "Пожалуйста, заполните имя, телефон и email.",
      },
      { status: 400 },
    );
  }

  const orderId = `IG-${Date.now().toString(36).toUpperCase()}`;

  console.log("Imperial Garden order request", {
    orderId,
    ...payload,
  });

  return NextResponse.json({
    success: true,
    orderId,
  });
}

