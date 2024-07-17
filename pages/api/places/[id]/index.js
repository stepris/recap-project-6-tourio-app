// import { places } from "../../../../lib/db.js";
import dbConnect from "@/db/connect";
import Place from "@/db/models/Place";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const place = await Place.findById(id);

    if (!place) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(place);
  }

  if (request.method === "PATCH") {
    try {
      const data = request.body;
      await Place.findByIdAndUpdate(id, data);

      return response.status(200).json({ status: "Location updated." });
    } catch (error) {
      return response.status(404).json({ status: "Not found" });
      console.log(error);
    }
  }

  if (!id) {
    return;
  }

  // const place = places.find((place) => place.id === id);

  // if (!place) {
  //   return response.status(404).json({ status: "Not found" });
  // }

  // response.status(200).json(place);
}
