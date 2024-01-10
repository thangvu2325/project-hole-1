/* eslint-disable no-unexpected-multiline */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Flex } from "antd";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setState } from "../../redux/formBorelogSlice";
import { FormBorelogDataType } from "../../types";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  formBorelogSelector,
  pileplansSelector,
  projectsSelector,
} from "../../redux/selector";
import {
  IconChevronLeft,
  IconFileExport,
  IconFileImport,
} from "@tabler/icons-react";
import * as XLSX from "xlsx";
import Title from "antd/es/typography/Title";

function Data() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const pileFouded = useAppSelector(pileplansSelector).data.find(
    (pile) => pile.pileId === params.pileId
  );
  const projectFounded = useAppSelector(projectsSelector).data.find(
    (project) => project.projectId === pileFouded?.projectId
  );
  const formDataBoreLogs = useAppSelector(formBorelogSelector).data.find(
    (form) => form.pileId === params.pileId
  )?.formData;
  const [formData, setFormData] = useState<FormBorelogDataType>(
    formDataBoreLogs ? formDataBoreLogs : {}
  );
  const dispatch = useAppDispatch();
  const handleClick = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    dispatch(setState({ ...formData, pileNo: params.pileId }));
    navigate(location.pathname + "/example");
  };
  const fileInputRef: any = useRef(null);

  const handleButtonClick = () => {
    // Mở cửa sổ chọn tệp khi nút được nhấp
    fileInputRef?.current?.click();
  };
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const data = event.target?.result as string;
        const workbook = XLSX.read(data, { type: "binary" });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        const dataReaded: Array<string[]> = (
          jsonData as Array<string[]>
        ).filter((item) => item.length > 0);
        const dataWillSet: FormBorelogDataType = {};
        dataReaded.forEach((element, findex) => {
          console.log(element);
          element.forEach((item, index) => {
            if (item == "Total weathered Rock, Boulders,\nCavity (m)") {
              console.log(item);
            }
            if (item.toString().trim().startsWith("Total weathered")) {
              dataWillSet.totalWeathered = dataReaded[findex + 1][index];
            }

            switch (item.toString().trim()) {
              case "Pile No":
                dataWillSet.pileNo = params.pileId;
                break;
              case "Boring Rig":
                dataWillSet.boringRig = dataReaded[findex + 1][index];
                break;
              case "Boring Start":
                dataWillSet.boringStartDate = new Date(
                  dataReaded[findex + 1][index].split("|")[0].trim()
                )
                  .toISOString()
                  .split("T")[0];
                dataWillSet.boringStartTime = new Date(
                  `1970-01-01T${dataReaded[findex + 1][index]
                    .split("|")
                    [
                      dataReaded[findex + 1][index].split("|").length - 1
                    ].trim()}`
                ).toLocaleTimeString("en-US", { hour12: false });
                break;
              case "Boring End":
                dataWillSet.boringEndDate = new Date(
                  dataReaded[findex + 1][index].split("|")[0].trim()
                )
                  .toISOString()
                  .split("T")[0];
                dataWillSet.boringEndTime = new Date(
                  `1970-01-01T${dataReaded[findex + 1][index]
                    .split("|")
                    [
                      dataReaded[findex + 1][index].split("|").length - 1
                    ].trim()}`
                ).toLocaleTimeString("en-US", { hour12: false });
                break;
              case "Groupting Start":
                dataWillSet.groutingStartDate = new Date(
                  dataReaded[findex + 1][index].split("|")[0].trim()
                )
                  .toISOString()
                  .split("T")[0];
                dataWillSet.groutingStartTime = new Date(
                  `1970-01-01T${dataReaded[findex + 1][index]
                    .split("|")
                    [
                      dataReaded[findex + 1][index].split("|").length - 1
                    ].trim()}`
                ).toLocaleTimeString("en-US", { hour12: false });
                break;
              case "Groupting End":
                // eslint-disable-next-line no-case-declarations
                dataWillSet.groutingEndDate = new Date(
                  dataReaded[findex + 1][index]
                    .split("|")[0]
                    .split("/")
                    .reverse()
                    .join("/")
                )
                  .toISOString()
                  .split("T")[0];

                dataWillSet.groutingEndTime = new Date(
                  `1970-01-01T${dataReaded[findex + 1][index]
                    .split("|")
                    [
                      dataReaded[findex + 1][index].split("|").length - 1
                    ].trim()}`
                ).toLocaleTimeString("en-US", { hour12: false });

                break;
              case "Platform (RL)":
                dataWillSet.platformLevel = dataReaded[findex + 1][index];
                break;
              case "Top of Casing (RL)":
                dataWillSet.topOfCasing = dataReaded[findex + 1][index];
                break;
              case "Cut-off Level (RL)":
                dataWillSet.cutOffLevel = dataReaded[findex + 1][index];
                break;
              case "Bored Depth (m) fr. TOC":
                dataWillSet.toc = dataReaded[findex + 1][index];
                break;
              case "Toe Level (RL)":
                dataWillSet.toe = dataReaded[findex + 1][index];
                break;
              case "Bored Depth (m) fr. OLG":
                dataWillSet.ogl = dataReaded[findex + 1][index];
                break;
              case "Pile Length (m)":
                dataWillSet.pileLength = dataReaded[findex + 1][index];
                break;
              case "Soil Drilling":
                dataWillSet.soilDrilling = dataReaded[findex + 1][index];
                break;

              case "Rock Socket Length (m)":
                dataWillSet.rockSocket = dataReaded[findex + 1][index];
                break;
              case "Grout Length (m)":
                dataWillSet.groutLength = dataReaded[findex + 1][index];
                break;
              case "Nos of Bag":
                dataWillSet.ofBag = dataReaded[findex + 1][index];
                break;
              case "API Pipe Size (mm)":
                dataWillSet.apiPileSize = dataReaded[findex + 1][index];
                break;
              case "API Pipe Length (m)":
                dataWillSet.apiPileLength = dataReaded[findex + 1][index];
                break;
              case "Permanent Casing (m)":
                dataWillSet.permanent = dataReaded[findex + 1][index];
                break;
            }
          });
        });
        dispatch(setState({ ...dataWillSet, pileNo: params.pileId }));
        setFormData((prev) => ({ ...prev, ...dataWillSet }));
      };

      reader.readAsBinaryString(file);
    }
  };
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      projectDate: projectFounded
        ? new Date(projectFounded?.project_date.split("/").reverse().join("/"))
            .toISOString()
            .split("T")[0]
        : "",
      pileNo: params?.pileId,
    }));
    dispatch(
      setState({
        pileNo: params?.pileId,
        projectDate: projectFounded
          ? new Date(
              projectFounded?.project_date.split("/").reverse().join("/")
            )
              .toISOString()
              .split("T")[0]
          : "",
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectFounded]);
  return (
    <div
      style={{
        padding: "24px 36px",
        borderRadius: "6px",
        paddingBottom: "48px",
        width: "100%",
      }}
    >
      <div className="bg-[#fff] p-4 rounded-md shadow-md">
        <div className="container relative">
          <Flex align="center">
            <Button type="primary" className="ml-4" onClick={handleButtonClick}>
              <Flex align="center">
                <IconFileImport width={16} height={16}></IconFileImport>
                <Title
                  level={3}
                  style={{
                    marginBottom: "0",
                    marginLeft: "8px",
                    color: "#fff",
                  }}
                >
                  Import
                </Title>
              </Flex>
            </Button>
            <input
              type="file"
              accept=".xlsx, .xls"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
            <a
              id="downloadLink"
              href="https://drive.google.com/uc?export=download&id=1UOgWTLj6GSqhGtn8lyoF032xsaIYPCAp"
              download="data.xlsx"
            >
              <Button type="primary" className="ml-4">
                <Flex align="center">
                  <IconFileExport width={16} height={16}></IconFileExport>{" "}
                  <Title
                    level={3}
                    style={{
                      marginBottom: "0",
                      marginLeft: "8px",
                      color: "#fff",
                    }}
                  >
                    Sample File to Import
                  </Title>
                </Flex>
              </Button>
            </a>
          </Flex>
          <form className="row m-[20px]" onSubmit={handleClick}>
            <div className="col-6 mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Project Date
              </label>
              <input
                type="date"
                className="form-control"
                id="exampleFormControlInput1"
                value={formData.projectDate ?? ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    projectDate: e.target.value,
                  }))
                }
              />
            </div>
            <div className="col-6 mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Pile No.
              </label>
              <input
                className="form-control"
                id="exampleFormControlTextarea1"
                value={formData.pileNo ?? ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, pileNo: e.target.value }))
                }
              />
            </div>
            <div className="col-3 mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Boring Start Date
              </label>
              <input
                type="date"
                className="form-control"
                id="exampleFormControlInput1"
                value={formData.boringStartDate ?? ""}
                onChange={(e) => {
                  return setFormData((prev) => ({
                    ...prev,
                    boringStartDate: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="col-3 mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Boring Start Time
              </label>
              <input
                className="form-control"
                id="exampleFormControlTextarea1"
                type="time"
                value={formData.boringStartTime ?? ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    boringStartTime: e.target.value,
                  }))
                }
              />
            </div>
            <div className="col-3 mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Boring End Date
              </label>
              <input
                className="form-control"
                id="exampleFormControlTextarea1"
                type="date"
                value={formData.boringEndDate ?? ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    boringEndDate: e.target.value,
                  }))
                }
              />
            </div>
            <div className="col-3 mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Boring End Time
              </label>
              <input
                className="form-control"
                id="exampleFormControlTextarea1"
                type="time"
                value={formData.boringEndTime ?? ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    boringEndTime: e.target.value,
                  }))
                }
              />
            </div>
            <div className="col-3 mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Grouting Start Date
              </label>
              <input
                type="date"
                className="form-control"
                id="exampleFormControlInput1"
                value={formData.groutingStartDate ?? ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    groutingStartDate: e.target.value,
                  }))
                }
              />
            </div>
            <div className="col-3 mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Grouting Start Time
              </label>
              <input
                className="form-control"
                id="exampleFormControlTextarea1"
                type="time"
                value={formData.groutingStartTime ?? ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    groutingStartTime: e.target.value,
                  }))
                }
              />
            </div>
            <div className="col-3 mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Grouting End Date
              </label>
              <input
                type="date"
                className="form-control"
                id="exampleFormControlInput1"
                value={formData.groutingEndDate ?? ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    groutingEndDate: e.target.value,
                  }))
                }
              />
            </div>
            <div className="col-3 mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Grouting End Time
              </label>
              <input
                type="time"
                className="form-control"
                id="exampleFormControlInput1"
                value={formData.groutingEndTime ?? ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    groutingEndTime: e.target.value,
                  }))
                }
              />
            </div>
            <div className="col-2 mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Platform Level (RL)
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                value={formData.platformLevel ?? ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    platformLevel: e.target.value,
                  }))
                }
              />
            </div>
            <div className="col-2 mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Top Of Casing (RL)
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                value={formData.topOfCasing ?? ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    topOfCasing: e.target.value,
                  }))
                }
              />
            </div>
            <div className="col-2 mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Cut-off Level (RL)
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                value={formData.cutOffLevel ?? ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    cutOffLevel: e.target.value,
                  }))
                }
              />
            </div>
            <div className="col-2 mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Bored Depth (m) fr. TOC
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                value={formData.toc ?? ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    toc: e.target.value,
                  }))
                }
              />
            </div>
            <div className="col-2 mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                TOE Level (RL)
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                value={formData.toe ?? ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    toe: e.target.value,
                  }))
                }
              />
            </div>
            <div className="col-2 mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Bored Depth (m) fr. OGL
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                value={formData.ogl ?? ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    ogl: e.target.value,
                  }))
                }
              />
            </div>
            <div className="col-2 mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Pile Length (m)
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                value={formData.pileLength ?? ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    pileLength: e.target.value,
                  }))
                }
              />
            </div>
            <div className="col-2 mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Soil Drilling (m)
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                value={formData.soilDrilling ?? ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    soilDrilling: e.target.value,
                  }))
                }
              />
            </div>
            <div className="col-2 mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Total weathered Rock
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                value={formData.totalWeathered ?? ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    totalWeathered: e.target.value,
                  }))
                }
              />
            </div>
            <div className="col-2 mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Rock Socket Length (m)
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                value={formData.rockSocket ?? ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    rockSocket: e.target.value,
                  }))
                }
              />
            </div>
            <div className="col-2 mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Grout Length (m)
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                value={formData.groutLength ?? ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    groutLength: e.target.value,
                  }))
                }
              />
            </div>
            <div className="col-2 mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Nos. of bag
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                value={formData.ofBag ?? ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    ofBag: e.target.value,
                  }))
                }
              />
            </div>
            <div className="col-4 mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                API Pipe Length (m)
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                value={formData.apiPileLength ?? ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    apiPileLength: e.target.value,
                  }))
                }
              />
            </div>
            <div className="col-4 mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                API Pipe Size (mm)
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                value={formData.apiPileSize ?? ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    apiPileSize: e.target.value,
                  }))
                }
              />
            </div>
            <div className="col-4 mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Permanent Casing (m)
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                value={formData.permanent ?? ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    permanent: e.target.value,
                  }))
                }
              />
            </div>

            <Button
              type="primary"
              htmlType="submit"
              className="btn btn-primary flex items-center justify-center w-[600px] h-8 mx-auto"
            >
              Next
            </Button>
          </form>
          <Button
            className="bg-gray-600 mr-4 w-20 flex justify-center items-center absolute bottom-0 right-0"
            onClick={() => {
              navigate(-1);
            }}
          >
            <IconChevronLeft className="text-[#fff]"></IconChevronLeft>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Data;
