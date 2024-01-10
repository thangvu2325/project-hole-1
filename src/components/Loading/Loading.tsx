import { IconLoader } from "@tabler/icons-react";
import { FunctionComponent } from "react";

interface LoadingProps {}

const Loading: FunctionComponent<LoadingProps> = () => {
  return (
    <div className=" bg-[#6366f1] fixed top-0 left-0 right-0 bottom-0">
      <div className="fixed top-[50%] left-[50%] ">
        <IconLoader
          className="animate-spin text-[#fff]"
          width={60}
          height={60}
        ></IconLoader>
      </div>
    </div>
  );
};

export default Loading;
