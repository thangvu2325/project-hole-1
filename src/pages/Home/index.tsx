import { FunctionComponent, useEffect } from "react";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  useEffect(() => {
    document.title = "SHINEI";
  }, []);
  return (
    <div className="text-center mt-28 text-[30px] font-[600]">
      Site Progress Reporting
    </div>
  );
};

export default Home;
