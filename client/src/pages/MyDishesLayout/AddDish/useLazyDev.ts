/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { useToast } from "../../../core/hooks/useGlobal";
import { foodAppInstance } from "../../../core/config/constants/axiosInstance";
import { useEffect } from "react";
import { isDev } from "../../../core/config/constants/environment";
import { makeNumPrice, makeNumQty } from "../../../utils/allUtils/makeNumber";
import { REG_MONGO } from "../../../core/config/constants/regex";
import { useSearchParams } from "react-router-dom";

const urls = [
  "https://img.freepik.com/free-photo/pizza-pizza-filled-with-tomatoes-salami-olives_140725-1200.jpg",
  "https://img.freepik.com/free-photo/side-view-penne-pasta-with-tomato-sauce-greens-plate_141793-5043.jpg",
  "https://img.freepik.com/free-photo/grilled-stake-with-black-pepper-baked-potato-tomatoes-rosemary-board_140725-10939.jpg",
  "https://img.freepik.com/free-photo/dessert-table_181624-10310.jpg?uid=R172218062&ga=GA1.1.1226271393.1737553858&semt=ais_hybrid",
  "https://img.freepik.com/free-photo/fried-meat-served-with-arugula-grilled-tomato_141793-1181.jpg",
];

const getImagesProxyAPI = async () => {
  const { data } = await foodAppInstance.post("/proxy", { urls });

  return data;
};

const base64ToFile = (base64Str, currIndex) => {
  const bytesChars = atob(base64Str.base64.split(",")[1]);
  // atob is built method js that decode base64 in utf-8 ASCI
  const bytesNum: any = [];

  let i = 0;
  while (i < bytesChars.length) {
    bytesNum.push(bytesChars.charCodeAt(i));
    // js has built in method to know which byte val has a char utf-8 ASCI
    i++;
  }

  const rawBytesArr = new Uint8Array(bytesNum);
  //  keep vals of a byte (0-255) as Array
  // like a Buffer version but for frontend with less methods built in than Buffer in Node, e.g needs Text Decoder to decode or Text Encoder to Encode

  return new File([rawBytesArr], `img_${currIndex}`, {
    type: base64Str.mimeType,
  });
};

export const useLazyDev = ({ setValue, reset }) => {
  const { showToastMsg } = useToast();

  const [searchParams] = useSearchParams();
  const restIdSent = searchParams.get("restId");

  const { data, isPending, isSuccess, isError, error } = useQuery({
    queryKey: ["urls", urls],
    queryFn: getImagesProxyAPI,
    enabled: isDev,
  });

  useEffect(() => {
    if (isError) {
      showToastMsg("Error", "ERROR");
    } else if (isSuccess) {
      const files = data.base64Imgs.map((el, i) => base64ToFile(el, i));

      reset({
        restaurant: REG_MONGO.test(restIdSent ?? "") ? restIdSent ?? "" : "",
        items: [
          ...Array.from({ length: 10 }).map((_, i) => ({
            name: `b_item_${i + 1 + ""}`,
            price: makeNumPrice(),
            quantity: makeNumQty(),
            images: [files?.[4]],
          })),
        ],
      });
    }
  }, [
    isSuccess,
    isError,
    error,
    data,
    showToastMsg,
    setValue,
    reset,
    restIdSent,
  ]);

  return {
    isPending,
  };
};
