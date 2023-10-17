import { storage } from "@Services/firebase"
import { getDownloadURL, ref } from "firebase/storage"

export const getImageUrl = async (image: string) => {
  return await getDownloadURL(ref(storage, image));
}
