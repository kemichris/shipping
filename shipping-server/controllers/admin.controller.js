import * as adminServices from "../services/admin.service.js";
import * as shipmentServices from "../services/shipment.service.js";
import ApiError from "../utils/apiError.utils.js";

export const getDashboard = async (req, res, next) => {
  try {
    const dashboard = await adminServices.getDashboard();
    return res
      .status(200)
      .json({
        success: true,
        message: "Dashboard data retrieved",
        data: dashboard,
      });
  } catch (error) {
    next(error);
  }
};

export const listShipments = async (req, res, next) => {
  try {
    const data = await adminServices.listShipments(req.query);
    return res
      .status(200)
      .json({ success: true, message: "Shipments retrieved", data });
  } catch (error) {
    next(error);
  }
};

export const getShipment = async (req, res, next) => {
  try {
    const data = await shipmentServices.getShipmentById(req.params.id);
    return res
      .status(200)
      .json({ success: true, message: "Shipment retrieved", data });
  } catch (error) {
    next(error);
  }
};

export const deleteShipment = async (req, res, next) => {
  try {
    const data = await shipmentServices.deleteShipment(req.params.id);
    return res
      .status(200)
      .json({ success: true, message: "Shipment deleted", data });
  } catch (error) {
    next(error);
  }
};

export const suggestAddresses = async (req, res, next) => {
  try {
    const query = String(req.query.q || "").trim();
    if (query.length < 3)
      return res.status(200).json({ success: true, data: [] });
    if (query.length > 200 || query.includes(";"))
      throw new ApiError(400, "Search query is invalid or too long.");
    const apiKey = process.env.GEOAPIFY_API_KEY;
    if (!apiKey)
      throw new ApiError(
        503,
        "Address suggestions are unavailable. Enter the address manually.",
      );
    const url = new URL("https://api.geoapify.com/v1/geocode/autocomplete");
    url.searchParams.set("text", query);
    url.searchParams.set("apiKey", apiKey);
    url.searchParams.set("format", "json");
    url.searchParams.set("limit", "5");
    const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!response.ok)
      throw new ApiError(
        response.status === 401 || response.status === 403 ? 503 : 502,
        "Address provider could not complete the search.",
      );
    const payload = await response.json();
    const data = (payload.results || [])
      .map((result) => {
        const street =
          [result.housenumber, result.street].filter(Boolean).join(" ") ||
          result.address_line1 ||
          result.name ||
          "";
        return {
          id:
            result.place_id ||
            result.datasource?.raw?.place_id ||
            result.formatted,
          label:
            result.formatted ||
            [street, result.city, result.state, result.country, result.postcode]
              .filter(Boolean)
              .join(", "),
          street,
          city: result.city || result.county || "",
          state: result.state || "",
          country: result.country || "",
          postalCode: result.postcode || "",
          coordinates:
            Number.isFinite(result.lon) && Number.isFinite(result.lat)
              ? [result.lon, result.lat]
              : [],
        };
      })
      .filter((item) => item.label && item.coordinates.length === 2);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};
