/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconUpload } from "@tabler/icons-react";
import { Space } from "antd";
import Title from "antd/es/typography/Title";
import { Fragment, FunctionComponent, useRef } from "react";
import * as XLSX from "xlsx";

interface ImportButtonExcelProps {
  onDataImport: any;
}

const ImportButtonExcel: FunctionComponent<ImportButtonExcelProps> = ({
  onDataImport,
}) => {
  const fileInputRef: any = useRef(null);

  const handleButtonClick = () => {
    // Mở cửa sổ chọn tệp khi nút được nhấp
    fileInputRef?.current?.click();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileChange = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const data = await readExcelFile(file);
      onDataImport(data);
    } catch (error) {
      console.error("Error reading Excel file:", error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const readExcelFile = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      reader.onload = (e: any) => {
        try {
          const workbook = XLSX.read(e.target.result, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          resolve(data);
        } catch (error) {
          reject(error);
        }
      };

      reader.readAsBinaryString(file);
    });
  };
  return (
    <Fragment>
      <Title
        level={3}
        style={{ margin: "0px", cursor: "pointer", userSelect: "none" }}
        onClick={handleButtonClick}
      >
        <Space className="px-3 py-[7px] hover:bg-[rgba(17,25,39,0.04)] rounded-md">
          <IconUpload width={13.5} height={13.5}></IconUpload> Import
        </Space>
      </Title>
      <input
        type="file"
        accept=".xlsx, .xls"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </Fragment>
  );
};

export default ImportButtonExcel;
