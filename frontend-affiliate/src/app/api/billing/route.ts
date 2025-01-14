// import api from "../axiosInstance";
const api = process.env.NEXT_PUBLIC_API_BE!;

export async function GET_BALANCE() {
  try {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken"))
      ?.split("=")[1];

    // If token exists, add it to the Authorization header
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await fetch(`${api}/affiliates/affiliate`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch mitra");
    }
    const data = await response.json();

    // const data = [ /* masukkan data JSON-mu di sini */ ];
    // console.log("data: ", data);
    const getData = data?.data;
    if (getData.length > 0) {
      const dataMap = getData.flatMap(
        (item: any) =>
          item?.affiliate?.transaction.map((tx: any) => ({
            email: item?.affiliate?.email || "N/A",
            name: item?.affiliate?.name || "N/A",
            totalPrice: tx?.totalPrice || "N/A",
            paymentMethod: tx?.paymentMethod || "N/A",
            status: tx?.status || "N/A",
          })) || []
      );

      const dataSuccess = dataMap.filter(
        (item: any) => item.status === "SUCCESS"
      );

      const dataUnsuccess = dataMap.filter(
        (item: any) => item.status != "SUCCESS"
      );
      // console.log("dataUnsuccess : ", dataUnsuccess);

      return {
        data,
        dataMap,
        dataSuccess,
        dataUnsuccess,
      };
    }

    if (!data) {
      throw new Error("Failed to fetch mitra");
    } else {
      return {
        data,
      };
    }
  } catch (error) {
    console.error("Error fetching balance:", error);
  }

  // return response;
}
