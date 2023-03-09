import { toast } from "react-toastify";
import { GET, POST } from "../../../../services/api";

export const blockAction = (status, types, blockId, callback) => {
  return async () => {
    const blockStatus = {
      blockStatus: !status ? 1 : 0,
      type: types,
    };
    const blockIds = `blockId=${blockId}` ?? "";
    const res = await POST(`admin/auth/block/?${blockIds}&`, blockStatus);
    console.log(res, "res");
    if (res?.data?.status_code === 200) {
      toast.success(res?.data?.message);
      callback(res);
    } else {
      toast.error(res?.data?.message);
    }
  };
};
