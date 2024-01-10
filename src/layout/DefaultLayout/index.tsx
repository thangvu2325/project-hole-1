import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { FunctionComponent, ReactNode } from "react";
import Header from "../components/Header";
import Sider from "../components/Sider";
import { useAppSelector } from "../../redux/hook";
import { settingsSelector } from "../../redux/selector";

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: FunctionComponent<DefaultLayoutProps> = ({ children }) => {
  const siderStatus = useAppSelector(settingsSelector)?.siderState;
  return (
    <Layout style={{ background: "transparent" }} className="flex flex-row">
      <Sider></Sider>
      <Header
        className={`${
          siderStatus === "idle"
            ? "left-72"
            : siderStatus
            ? "left-72 animate-whenSideOn"
            : "left-2 animate-WhenSiderOff"
        }`}
      ></Header>
      <Content
        className={` absolute right-0 bg-[transparent] h-screen ${
          siderStatus === "idle"
            ? "left-72"
            : siderStatus
            ? "left-72 animate-whenSideOn"
            : "left-2 animate-WhenSiderOff"
        }`}
      >
        <div className="mt-[64px]">{children}</div>
      </Content>
    </Layout>
  );
};

export default DefaultLayout;
