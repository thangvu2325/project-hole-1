/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconDownload } from "@tabler/icons-react";
import { Space } from "antd";
import Title from "antd/es/typography/Title";
import { FunctionComponent } from "react";
import * as XLSX from "xlsx";

interface ExportButtonExcelProps {
  data: any;
  fileName: string;
}

const ExportButtonExcel: FunctionComponent<ExportButtonExcelProps> = ({
  data,
  fileName,
}) => {
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  return (
    <Title
      level={3}
      style={{ margin: "0px", cursor: "pointer", userSelect: "none" }}
    >
      <Space
        className="px-3 py-[7px] ml-2 hover:bg-[rgba(17,25,39,0.04)] rounded-md"
        onClick={exportToExcel}
      >
        <IconDownload width={13.5} height={13.5}></IconDownload>
        Export
      </Space>
    </Title>
  );
};

export default ExportButtonExcel;
