/* eslint-disable react-hooks/exhaustive-deps */
import { FunctionComponent, useCallback } from "react";
import Title from "antd/es/typography/Title";
import EditableTableForm from "./EditableTableForm";
import { useAppDispatch } from "../../redux/hook";
import { deepType } from "../../types";
import { setState } from "../../redux/formBorelogSlice";
import { Link, useLocation, useParams } from "react-router-dom";
import { notification } from "antd";

interface BoreLogProps {}

const BoreLog: FunctionComponent<BoreLogProps> = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useAppDispatch();
  const location = useLocation();
  const params = useParams();
  const [api, contextHolder] = notification.useNotification();
  const handleChangeTable = useCallback((value: deepType[]) => {
    try {
      dispatch(setState({ deep: value, pileNo: params.pileId }));
      api["success"]({
        message: "Success!",
      });
    } catch (error) {
      api["error"]({
        message: "Error!",
      });
    }
  }, []);
  return (
    <div
      style={{
        padding: "24px 36px",
        borderRadius: "6px",
        paddingBottom: "48px",
        width: "100%",
      }}
    >
      {contextHolder}
      <div className=" bg-[#fff] shadow-lg rounded-md pb-4">
        <Link to={location.pathname + "/previewpdf"} className="flex">
          <Title
            level={3}
            className="m-4 p-2 whitespace-nowrap flex items-center outline-none font-semibold cursor-pointer select-none underline"
          >
            Preview PDF
          </Title>
        </Link>
        <div className="px-4">
          <EditableTableForm
            handleChangeTable={handleChangeTable}
          ></EditableTableForm>
        </div>
      </div>
    </div>
  );
};

export default BoreLog;
