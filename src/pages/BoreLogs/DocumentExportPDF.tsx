/* eslint-disable @typescript-eslint/no-explicit-any */
import Title from "antd/es/typography/Title";
import React, { Component } from "react";
import logo from "../../assets/image/Micropile Borelogs.png";
import { Flex, Image } from "antd";
import { FormBorelogDataType } from "../../types";
import { Dispatch } from "@reduxjs/toolkit";
import { setState } from "../../redux/formBorelogSlice";

type DocumentExportPDFProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: React.MutableRefObject<any>;
  className?: string;
  formData?: FormBorelogDataType;
  dispatch: Dispatch;
  pileId: string;
};
export default class DocumentExportPDF extends Component<DocumentExportPDFProps> {
  formData = this.props.formData;
  state: FormBorelogDataType = {};
  updateState = (key: string, value: string) => {
    this.setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  render() {
    console.log(this.state);
    return (
      <div className="mx-auto text-[12px] p-4  ">
        <Flex justify="space-between" align="end" className="mb-3">
          <Image
            preview={false}
            src={logo}
            height={70}
            className="ml-1"
          ></Image>
          <Flex vertical>
            <Title level={3} style={{ textAlign: "center" }}>
              SHINEI GEOTECHNIQUE (M)SDN. BHD
            </Title>
            <Title level={3} style={{ textAlign: "center" }}>
              MICROPILE BORELOG
            </Title>
          </Flex>
          <Flex style={{ marginBottom: "-18px" }} align="end">
            <Title
              style={{
                border: "2px solid #e5e7eb",
                padding: "4px 6px",
              }}
              level={3}
            >
              Log No.
            </Title>
            <Title
              style={{ border: "2px solid #e5e7eb", padding: "4px 6px" }}
              level={3}
            >
              17
            </Title>
          </Flex>
        </Flex>
        <div className="grid grid-cols-10 ">
          <p className="col-span-1 border-2  pl-[4px] sm:p-[2px] ">Project</p>
          <p className="col-span-7 border-2  pl-[4px] sm:p-[2px]">
            Proposed Slope Remediation for Monoluxury Sdn Bhd Cameron
          </p>
          <p className="col-span-1 border-2  pl-[4px] sm:p-[2px]">Date</p>
          <input
            className="col-span-1 border-2  pl-[4px] sm:p-[2px]"
            type="text"
            value={
              this.state.projectDate
                ? this.state.projectDate
                : this.formData?.projectDate ?? ""
            }
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              this.updateState("projectDate", e.target.value);
              this.props.dispatch(
                setState({
                  pileNo: this.props.pileId,
                  projectDate: e.target.value,
                })
              );
            }}
          ></input>
        </div>
        <div className="grid grid-cols-10 ">
          <p className="col-span-1 border-2  pl-[4px] sm:p-[2px] ">Pile No.</p>
          <input
            className="col-span-4 border-2  pl-[4px] sm:p-[2px]"
            type="text"
            value={
              this.state.pileNo
                ? this.state.pileNo
                : this.formData?.pileNo ?? ""
            }
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              this.updateState("pileNo", e.target.value);
              this.props.dispatch(
                setState({
                  pileNo: e.target.value,
                })
              );
            }}
          ></input>
          <p className="col-span-1 border-2  pl-[4px] sm:p-[2px]">Pile Dia</p>
          <p className="col-span-2 border-2  pl-[4px] sm:p-[2px]">200mm</p>
          <p className="col-span-1 border-2  pl-[4px] sm:p-[2px]">Rake</p>
          <p className="col-span-1 border-2   pl-[4px] sm:p-[2px]">Vertical</p>
        </div>
        <div className="grid grid-cols-10 ">
          <p className="col-span-3 border-2  pl-[4px] sm:p-[2px] ">
            Boring Plant.
          </p>
          <p className="col-span-2 border-2  pl-[4px] sm:p-[2px] ">
            Hong Drill
          </p>
          <p className="col-span-1 border-2  pl-[4px] sm:p-[2px] ">Depth (m)</p>
          <p className="col-span-4 border-2  pl-[4px] sm:p-[2px] text-center">
            Description
          </p>
        </div>
        <div className="grid grid-cols-10 mt-[2px]">
          <div className="col-span-5 grid grid-cols-5">
            <div className="col-span-5  grid grid-cols-5">
              <p className="col-span-1  border-2 pl-[4px] sm:p-[2px]">Boring</p>
              <p className="col-span-2   border-2 pl-[4px] sm:p-[2px] text-center">
                Date
              </p>
              <p className="col-span-2 border-2  pl-[4px] sm:p-[2px] text-center">
                Time
              </p>
            </div>
            <div className="col-span-5 grid grid-cols-5">
              <p className="col-span-1 border-2  pl-[4px] sm:p-[2px]">Start</p>
              <input
                type="text"
                className="col-span-2 border-2  pl-[4px] sm:p-[2px] text-center"
                value={
                  this.state.boringStartDate
                    ? this.state.boringStartDate
                    : this.formData?.boringStartDate ?? ""
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  this.updateState("boringStartDate", e.target.value);
                  this.props.dispatch(
                    setState({
                      pileNo: this.props.pileId,
                      boringStartDate: e.target.value,
                    })
                  );
                }}
              />
              <input
                type="text"
                className="col-span-2 border-2  pl-[4px] sm:p-[2px] text-center"
                value={
                  this.state.boringStartTime
                    ? this.state.boringStartTime
                    : this.formData?.boringStartTime ?? ""
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  this.updateState("boringStartTime", e.target.value);
                  this.props.dispatch(
                    setState({
                      pileNo: this.props.pileId,
                      boringStartTime: e.target.value,
                    })
                  );
                }}
              />
            </div>
            <div className="col-span-5 grid grid-cols-5">
              <p className="col-span-1 border-2  pl-[4px] sm:p-[2px]">End</p>
              <input
                type="text"
                className="col-span-2 border-2  pl-[4px] sm:p-[2px] text-center"
                value={
                  this.state.boringEndDate
                    ? this.state.boringEndDate
                    : this.formData?.boringEndDate ?? ""
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  this.updateState("boringEndDate", e.target.value);
                  this.props.dispatch(
                    setState({
                      pileNo: this.props.pileId,
                      boringEndDate: e.target.value,
                    })
                  );
                }}
              />
              <input
                type="text"
                className="col-span-2 border-2  pl-[4px] sm:p-[2px] text-center"
                value={
                  this.state.boringEndTime
                    ? this.state.boringEndTime
                    : this.formData?.boringEndTime ?? ""
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  this.updateState("boringEndTime", e.target.value);
                  this.props.dispatch(
                    setState({
                      pileNo: this.props.pileId,
                      boringEndTime: e.target.value,
                    })
                  );
                }}
              />
            </div>
            <div className="col-span-5 grid grid-cols-5">
              <p className="col-span-1 border-2  pl-[4px] sm:p-[2px]">
                Grouting
              </p>
              <p className="col-span-2 border-2  pl-[4px] sm:p-[2px] text-center">
                Date
              </p>
              <p className="col-span-2 border-2  pl-[4px] sm:p-[2px] text-center">
                Time
              </p>
            </div>
            <div className="col-span-5 grid grid-cols-5">
              <p className="col-span-1 border-2  pl-[4px] sm:p-[2px]">Start</p>
              <input
                type="text"
                className="col-span-2 border-2  pl-[4px] sm:p-[2px] text-center"
                value={
                  this.state.groutingStartDate
                    ? this.state.groutingStartDate
                    : this.formData?.groutingStartDate ?? ""
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  this.updateState("groutingStartDate", e.target.value);
                  this.props.dispatch(
                    setState({
                      pileNo: this.props.pileId,
                      groutingStartDate: e.target.value,
                    })
                  );
                }}
              />
              <input
                type="text"
                className="col-span-2 border-2  pl-[4px] sm:p-[2px] text-center"
                value={
                  this.state.groutingStartTime
                    ? this.state.groutingStartTime
                    : this.formData?.groutingStartTime ?? ""
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  this.updateState("groutingStartTime", e.target.value);
                  this.props.dispatch(
                    setState({
                      pileNo: this.props.pileId,
                      groutingStartTime: e.target.value,
                    })
                  );
                }}
              />
            </div>
            <div className="col-span-5 grid grid-cols-5">
              <p className="col-span-1 border-2  pl-[4px] sm:p-[2px]">End</p>
              <input
                type="text"
                className="col-span-2 border-2  pl-[4px] sm:p-[2px] text-center"
                value={
                  this.state.groutingEndDate
                    ? this.state.groutingEndDate
                    : this.formData?.groutingEndDate ?? ""
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  this.updateState("groutingEndDate", e.target.value);
                  this.props.dispatch(
                    setState({
                      pileNo: this.props.pileId,
                      groutingEndDate: e.target.value,
                    })
                  );
                }}
              />
              <input
                type="text"
                className="col-span-2 border-2  pl-[4px] sm:p-[2px] text-center"
                value={
                  this.state.groutingEndTime
                    ? this.state.groutingEndTime
                    : this.formData?.groutingEndTime ?? ""
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  this.updateState("groutingEndTime", e.target.value);
                  this.props.dispatch(
                    setState({
                      pileNo: this.props.pileId,
                      groutingEndTime: e.target.value,
                    })
                  );
                }}
              />
            </div>
            <div className="col-span-5 grid grid-cols-5">
              <p className="col-span-3 border-2  text-center pl-[4px] sm:p-[2px]">
                Platform Level (RL)
              </p>

              <input
                type="text"
                className="col-span-2 border-2   pl-[4px] sm:p-[2px] text-center"
                value={
                  this.state.platformLevel
                    ? this.state.platformLevel
                    : this.formData?.platformLevel ?? ""
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  this.updateState("platformLevel", e.target.value);
                  this.props.dispatch(
                    setState({
                      pileNo: this.props.pileId,
                      platformLevel: e.target.value,
                    })
                  );
                }}
              />
            </div>
            <div className="col-span-5 grid grid-cols-5">
              <p className="col-span-3 border-2  text-center pl-[4px] sm:p-[2px]">
                Top Of Casing (RL)
              </p>

              <input
                type="text"
                className="col-span-2 border-2  pl-[4px] sm:p-[2px] text-center"
                value={
                  this.state.topOfCasing
                    ? this.state.topOfCasing
                    : this.formData?.topOfCasing ?? ""
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  this.updateState("topOfCasing", e.target.value);
                  this.props.dispatch(
                    setState({
                      pileNo: this.props.pileId,
                      topOfCasing: e.target.value,
                    })
                  );
                }}
              />
            </div>
            <div className="col-span-5 grid grid-cols-5">
              <p className="col-span-3 border-2  text-center pl-[4px] sm:p-[2px]">
                Cut-off Level (RL)
              </p>

              <input
                type="text"
                className="col-span-2 border-2   pl-[4px] sm:p-[2px] text-center"
                value={
                  this.state.cutOffLevel
                    ? this.state.cutOffLevel
                    : this.formData?.cutOffLevel ?? ""
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  this.updateState("cutOffLevel", e.target.value);
                  this.props.dispatch(
                    setState({
                      pileNo: this.props.pileId,
                      cutOffLevel: e.target.value,
                    })
                  );
                }}
              />
            </div>
            <div className="col-span-5 grid grid-cols-5">
              <p className="col-span-3 border-2  text-center pl-[4px] sm:p-[2px]">
                Bored Depth (m) fr. TOC
              </p>

              <input
                type="text"
                className="col-span-2 border-2  pl-[4px] sm:p-[2px] text-center"
                value={
                  this.state.toc ? this.state.toc : this.formData?.toc ?? ""
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  this.updateState("toc", e.target.value);
                  this.props.dispatch(
                    setState({
                      pileNo: this.props.pileId,
                      toc: e.target.value,
                    })
                  );
                }}
              />
            </div>
            <div className="col-span-5 grid grid-cols-5">
              <p className="col-span-3 border-2  text-center pl-[4px] sm:p-[2px]">
                TOE Level (RL)
              </p>

              <input
                type="text"
                className="col-span-2 border-2   pl-[4px] sm:p-[2px] text-center"
                value={
                  this.state.toe ? this.state.toe : this.formData?.toe ?? ""
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  this.updateState("toe", e.target.value);
                  this.props.dispatch(
                    setState({
                      pileNo: this.props.pileId,
                      toe: e.target.value,
                    })
                  );
                }}
              />
            </div>
            <div className="col-span-5 grid grid-cols-5">
              <p className="col-span-3 border-2   text-center pl-[4px] sm:p-[2px]">
                Bored Depth (m) fr. OGL
              </p>

              <input
                type="text"
                className="col-span-2 border-2  pl-[4px] sm:p-[2px] text-center"
                value={
                  this.state.ogl ? this.state.ogl : this.formData?.ogl ?? ""
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  this.updateState("ogl", e.target.value);
                  this.props.dispatch(
                    setState({
                      pileNo: this.props.pileId,
                      ogl: e.target.value,
                    })
                  );
                }}
              />
            </div>
            <div className="col-span-5 grid grid-cols-5">
              <p className="col-span-3 border-2  text-center pl-[4px] sm:p-[2px]">
                Pile Length (m)
              </p>

              <input
                type="text"
                className="col-span-2 border-2  pl-[4px] sm:p-[2px] text-center"
                value={
                  this.state.pileLength
                    ? this.state.pileLength
                    : this.formData?.pileLength ?? ""
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  this.updateState("pileLength", e.target.value);
                  this.props.dispatch(
                    setState({
                      pileNo: this.props.pileId,
                      pileLength: e.target.value,
                    })
                  );
                }}
              />
            </div>
            <div className="col-span-5 grid grid-cols-5">
              <p className="col-span-3 border-2  text-center pl-[4px] sm:p-[2px]">
                Soil Drilling (m)
              </p>

              <input
                type="text"
                className="col-span-2 border-2  pl-[4px] sm:p-[2px] text-center"
                value={
                  this.state.soilDrilling
                    ? this.state.soilDrilling
                    : this.formData?.soilDrilling ?? ""
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  this.updateState("soilDrilling", e.target.value);
                  this.props.dispatch(
                    setState({
                      pileNo: this.props.pileId,
                      soilDrilling: e.target.value,
                    })
                  );
                }}
              />
            </div>
            <div className="col-span-5 grid grid-cols-5">
              <p className="col-span-3 border-2  text-center pl-[4px] sm:p-[2px]">
                Total weathered Rock, Boulders, Cavity (m)
              </p>

              <input
                type="text"
                className="col-span-2 border-2  pl-[4px] sm:p-[2px] text-center"
                value={
                  this.state.totalWeathered
                    ? this.state.totalWeathered
                    : this.formData?.totalWeathered ?? ""
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  this.updateState("totalWeathered", e.target.value);
                  this.props.dispatch(
                    setState({
                      pileNo: this.props.pileId,
                      totalWeathered: e.target.value,
                    })
                  );
                }}
              />
            </div>
            <div className="col-span-5 grid grid-cols-5">
              <p className="col-span-3 border-2  text-center pl-[4px] sm:p-[2px]">
                Rock Socket Length (m)
              </p>

              <input
                type="text"
                className="col-span-2 border-2  pl-[4px] sm:p-[2px] text-center"
                value={
                  this.state.rockSocket
                    ? this.state.rockSocket
                    : this.formData?.rockSocket ?? ""
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  this.updateState("rockSocket", e.target.value);
                  this.props.dispatch(
                    setState({
                      pileNo: this.props.pileId,
                      rockSocket: e.target.value,
                    })
                  );
                }}
              />
            </div>
            <div className="col-span-5 grid grid-cols-5">
              <p className="col-span-3 border-2  text-center pl-[4px] sm:p-[2px]">
                Grout Length (m)
              </p>

              <input
                type="text"
                className="col-span-2 border-2  pl-[4px] sm:p-[2px] text-center"
                value={
                  this.state.groutLength
                    ? this.state.groutLength
                    : this.formData?.groutLength ?? ""
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  this.updateState("groutLength", e.target.value);
                  this.props.dispatch(
                    setState({
                      pileNo: this.props.pileId,
                      groutLength: e.target.value,
                    })
                  );
                }}
              />
            </div>
            <div className="col-span-5 grid grid-cols-5">
              <p className="col-span-3 border-2  text-center pl-[4px] sm:p-[2px]">
                Nos. of bag
              </p>

              <input
                type="text"
                className="col-span-2 border-2  pl-[4px] sm:p-[2px] text-center"
                value={
                  this.state.ofBag
                    ? this.state.ofBag
                    : this.formData?.ofBag ?? ""
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  this.updateState("ofBag", e.target.value);
                  this.props.dispatch(
                    setState({
                      pileNo: this.props.pileId,
                      ofBag: e.target.value,
                    })
                  );
                }}
              />
            </div>
            <div className="col-span-5 grid grid-cols-5">
              <p className="col-span-3 border-2   text-center pl-[4px] sm:p-[2px]">
                API Pipe Size (mm)
              </p>
              <input
                type="text"
                className="col-span-2 border-2  pl-[4px] sm:p-[2px] text-center"
                value={
                  this.state.apiPileSize
                    ? this.state.apiPileSize
                    : this.formData?.apiPileSize ?? ""
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  this.updateState("apiPileSize", e.target.value);
                  this.props.dispatch(
                    setState({
                      pileNo: this.props.pileId,
                      apiPileSize: e.target.value,
                    })
                  );
                }}
              />
            </div>
            <div className="col-span-5 grid grid-cols-5">
              <p className="col-span-3 border-2  text-center pl-[4px] sm:p-[2px]">
                API Pipe Length (m)
              </p>

              <input
                type="text"
                className="col-span-2 border-2  pl-[4px] sm:p-[2px] text-center"
                value={
                  this.state.apiPileLength
                    ? this.state.apiPileLength
                    : this.formData?.apiPileLength ?? ""
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  this.updateState("apiPileLength", e.target.value);
                  this.props.dispatch(
                    setState({
                      pileNo: this.props.pileId,
                      apiPileLength: e.target.value,
                    })
                  );
                }}
              />
            </div>
            <div className="col-span-5 grid grid-cols-5">
              <p className="col-span-3 border-2  text-center pl-[4px] sm:p-[2px]">
                Permanent Casing (m)
              </p>

              <input
                type="text"
                className="col-span-2 border-2  pl-[4px] sm:p-[2px] text-center"
                value={
                  this.state.permanent
                    ? this.state.permanent
                    : this.formData?.permanent ?? ""
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  this.updateState("permanent", e.target.value);
                  this.props.dispatch(
                    setState({
                      pileNo: this.props.pileId,
                      permanent: e.target.value,
                    })
                  );
                }}
              />
            </div>
            <div className="col-span-5 grid grid-cols-5">
              <p className="col-span-3 border-2  text-center pl-[4px] sm:p-[2px]"></p>

              <input
                type="text"
                className="col-span-2 border-2   pl-[4px] sm:p-[2px] text-center"
              />
            </div>
            <div className="col-span-5 grid grid-cols-5">
              <p className="col-span-3 border-2   text-center pl-[4px] sm:p-[2px]"></p>

              <input
                type="text"
                className="col-span-2 border-2  pl-[4px] sm:p-[2px] text-center"
              />
            </div>
            <div className="col-span-5 grid grid-cols-5">
              <p className="col-span-5 border-2   text-center pl-[4px] sm:p-[2px]">
                Remarks
              </p>
            </div>
            <div className="col-span-5 grid grid-cols-5">
              <p className="col-span-5 border-2   text-center pl-[4px] sm:p-[2px] h-[120px]"></p>
            </div>
            <div className="col-span-5 grid grid-cols-5">
              <div className="col-span-5 border-2 pl-[4px] sm:p-[2px] h-[60px] grid grid-rows-[1fr, auto]">
                <p>Record by SHINEL's representative:</p>
                <p className="self-end">Name:</p>
              </div>
            </div>

            <div className="col-span-5 grid grid-cols-5">
              <p className="col-span-5 border-2 pl-[4px] sm:p-[2px] h-[60px] grid grid-rows-[1fr, auto]">
                <p>Checked and Verified by Client's Rep:</p>
                <p className="self-end">Name:</p>
              </p>
            </div>
            <div className="col-span-5 grid grid-cols-5">
              <p className="col-span-5 border-2  pl-[4px] sm:p-[2px] h-[60px] grid grid-rows-[1fr, auto]">
                <p>Checked and Verified by Engineer's Rep:</p>
                <p className="self-end">Name:</p>
              </p>
            </div>
          </div>

          <div className="col-span-5 grid grid-cols-5 border-[2px] border-solid border-[#e5e7eb]">
            <div className="col-span-1 border-[2px] border-solid border-l-0 border-[#e5e7eb]"></div>
            <div className="col-span-4 border-[2px] border-solid border-[#e5e7eb]">
              {this.formData?.deep?.length
                ? this.formData?.deep.map((item, index, array) => {
                    const deepest = array[array.length - 1].depth;
                    const deep =
                      index > 0
                        ? array[index].depth - array[index - 1].depth
                        : array[index].depth;
                    const heightPercent = (deep * 100) / deepest;
                    const isLastItem = index === array.length - 1;
                    const isFirstItem = index === 0;
                    return (
                      <div
                        key={index}
                        className={`w-full ${
                          isLastItem ? "border-b-0" : "border-b-2"
                        }  border-solid border-[#ccc] relative`}
                        style={{ height: `${heightPercent}%` }}
                      >
                        <Title
                          level={2}
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                          }}
                        >
                          {item.description}
                        </Title>
                        <Title
                          level={3}
                          className={`absolute ${
                            isLastItem ? "bottom-0" : isFirstItem ? "top-0" : ""
                          } left-[50%] translate-x-[-50%]`}
                          style={{ margin: "0", fontWeight: "600" }}
                        >
                          {isLastItem
                            ? "End of BoreHole"
                            : isFirstItem
                            ? "Top of Borehole"
                            : ""}
                        </Title>
                        <div
                          className={`absolute left-[-40px] bottom-[-2px] w-[40px] ${
                            isLastItem ? "h-0" : "h-[2px]"
                          } bg-[#ccc]`}
                        >
                          <div className="absolute top-[-16px] right-2 text-[16px] text-nowrap ">
                            {item.depth} m
                          </div>
                        </div>
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
