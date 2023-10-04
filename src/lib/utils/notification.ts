import { toast } from "sonner";

export const errorNotification = (msg: string) => {
  return toast.error(msg, {
    duration: 5000,
    position: "top-right",
  });
};

export const successNotification = (msg: string) => {
  return toast.success(msg, {
    duration: 5000,
    position: "top-right",
  });
};
