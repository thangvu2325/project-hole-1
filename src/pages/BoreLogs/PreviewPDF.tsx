import { FunctionComponent, useRef } from "react";
import ReactToPrint from "react-to-print";
import { Button, Flex } from "antd";
import DocumentExportPDF from "../BoreLogs/DocumentExportPDF";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { formBorelogSelector } from "../../redux/selector";
import { IconChevronLeft } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";

interface PreviewPageProps {}
export type dataType = {
  depth: number;
  description: string;
};
const PreviewPage: FunctionComponent<PreviewPageProps> = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const componentRef = useRef<any>(null);
  const params = useParams();
  const formData = useAppSelector(formBorelogSelector)?.data?.find(
    (form) => form.pileId === params.pileId
  )?.formData;
  const navigate = useNavigate();
  const handlePrint = () => {
    if (componentRef.current) {
      // Trigger the print action
      componentRef.current.onPrint();
    }
  };
  const dispatch = useAppDispatch();
  return (
    <div className="pb-4 px-8">
      <Flex align="center">
        <Button
          className="bg-gray-600 mr-2 w-20 flex justify-center items-center ml-4"
          onClick={() => {
            navigate(-1);
          }}
        >
          <IconChevronLeft className="text-[#fff]"></IconChevronLeft>
        </Button>
        <ReactToPrint
          trigger={() => (
            <Button
              type="primary"
              style={{ margin: "8px 16px " }}
              onClick={handlePrint}
            >
              Export
            </Button>
          )}
          content={() => componentRef.current}
        />
      </Flex>
      <div className="w-[640px] my-9 mx-auto border-[0.8px] border-solid border-[#e5e7eb] shadow">
        <DocumentExportPDF
          ref={componentRef}
          formData={formData}
          dispatch={dispatch}
          pileId={params?.pileId ?? ""}
        ></DocumentExportPDF>
      </div>
    </div>
  );
};

export default PreviewPage;
