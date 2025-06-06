import { NextRequest } from "next/server";
import { v2 } from "cloudinary";
import {
  CLOUDINARY_CLOUD,
  CLOUDINARY_KEY,
  CLOUDINARY_SECRET,
} from "@/constants/envs";

v2.config({
  secure: true,
});

export async function POST(request: NextRequest) {
  const payload = await request.formData();
  const file = payload.get("file") as File;

  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = v2.utils.api_sign_request(
    {
      timestamp: timestamp,
    },
    CLOUDINARY_SECRET as string
  );

  const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/upload`;

  const fd = new FormData();

  fd.append("file", file);
  fd.append("api_key", CLOUDINARY_KEY as string);
  fd.append("timestamp", String(timestamp));
  fd.append("signature", signature);

  try {
    const data = await fetch(url, {
      method: "POST",
      body: fd,
    });

    const parseData = await data.json();

    if (data.status === 200) {
      return Response.json(parseData, { status: 200 });
    } else {
      throw Error(String(data.status));
    }
  } catch (error) {
    console.log(error);
    return Response.json(null, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const payload = await request.formData();
  const publicId = payload.get("public_id");
  const resourceType = payload.get("resource_type");

  try {
    const data = await v2.uploader.destroy(publicId as string, {
      resource_type: resourceType as string,
    });

    if (data?.result === "ok") {
      return Response.json(null, { status: 200 });
    } else {
      throw Error(data?.result);
    }
  } catch (error) {
    console.log(error);
    return Response.json(null, { status: 500 });
  }
}
