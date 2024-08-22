import axios from "axios";
import fileDownload from "js-file-download";
import toast from "react-hot-toast";
interface Props {
  url: string;
  name: string;
}

export const downloadFile = async ({ url, name}: Props): Promise<any> => {
  try {
    toast.success("File requested")
    const res = await axios({
      url: url,
      method: "GET",
      responseType: "blob"
    });
    fileDownload(res.data, name);
    toast.success("Download success")
  } catch (error) {
    toast.error("Error downloading file");
  }
};