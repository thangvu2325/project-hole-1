/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Tag,
  notification,
} from "antd";
import { ColumnsType } from "antd/es/table";
import Title from "antd/es/typography/Title";
import {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { projectsRemainingSelector } from "../../redux/selector";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  addProject,
  addProjectPlantExcel,
  editFilter,
} from "../../redux/projectsSlice";
import {
  IconChevronDown,
  IconChevronRight,
  IconPlus,
} from "@tabler/icons-react";
import ModalAdd from "../../components/ModalAdd";
import ImportButtonExcel from "../../components/ImportButtonExcel";
import ExportButtonExcel from "../../components/ExportButtonExcel";

interface ProjectPageProps {}
interface DataType {
  key?: string;
  projectId?: string;
  project_name: string;
  project_status: string;
  project_date: string;
}

const columns: ColumnsType<DataType> | null = [
  {
    title: "No.",
    dataIndex: "key",
    sortDirections: ["descend"],
  },
  {
    title: "Project Name",
    dataIndex: "project_name",
  },
  {
    title: "Status",
    dataIndex: "project_status",
    filters: [
      { text: "Process", value: "Process" },
      { text: "Done", value: "Done" },
    ],
    onFilter: (value: string | boolean | React.Key, record) =>
      typeof value === "string"
        ? record.project_status.indexOf(value) === 0
        : true,
  },

  {
    title: "Date",
    dataIndex: "project_date",
  },
  {
    title: "Pile Plan",
    dataIndex: "detail",
  },
];
type FieldType = {
  projectId?: string;
  project_name?: string;
  project_status?: string;
};
const ProjectPage: FunctionComponent<ProjectPageProps> = () => {
  const projectData = useAppSelector(projectsRemainingSelector);
  const tableData = projectData?.map((project, index) => {
    return {
      ...project,
      key: (index + 1).toString(),
      detail: (
        <Tag color="geekblue">
          <Title
            level={3}
            style={{
              fontWeight: "500",
              margin: "0",
              padding: "4px 0px",
              width: "fit-content",
              display: "flex",
              alignItems: "center",
            }}
            className="hover:text-blue-400 cursor-pointer"
            onClick={() => {
              navigate(
                location.pathname + "/" + project.projectId + "/pileplan"
              );
            }}
          >
            Detail
            <IconChevronRight width={16} height={16}></IconChevronRight>
          </Title>
        </Tag>
      ),
    };
  });
  const [open, setOpen] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [api, contextHolder] = notification.useNotification();
  const refDiv = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleToggleShowSearchBox = () => {
    if (refDiv.current) {
      refDiv.current.classList.toggle("h-42");
    }
  };
  const handleDataImport = (data: Array<Array<string>>) => {
    const keys = data[0];

    // Biến đổi mảng theo keys
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const resultArray: any = data.slice(1).map((row) => {
      const obj: Record<string, string> = {};
      keys.forEach((key, index) => {
        obj[key] = row[index];
      });
      return obj;
    });

    dispatch(addProjectPlantExcel(resultArray));
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = useCallback(async (values: any) => {
    console.log(values);
    try {
      dispatch(
        addProject({
          ...values,
          project_date: values.project_date.format("DD-MM-YYYY").toString(),
        })
      );
      api["success"]({
        message: "Success!",
      });
    } catch (error) {
      api["error"]({
        message: "Failed",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFinishFailed = useCallback((errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  }, []);

  const onFinishSearch = (values: FieldType) => {
    setSearchParams(values);
    console.log(values);
    dispatch(editFilter(values));
  };
  const onFinishSearchFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    dispatch(
      editFilter({
        projectId: searchParams.get("projectId") ?? "",
        project_status: searchParams.get("project_status") ?? "",
        project_date: searchParams.get("project_date") ?? "",
      })
    );
    document.title = "Micropile Borelog";
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className="bg-[#fff] border-[0.8px] border-solid border-[#ccc] rounded-md">
        <Flex justify="space-between">
          <Flex vertical>
            <Title level={1} className="ml-4 mt-4">
              Micropile Borelog
            </Title>
            <Flex className="mt-2" align="center">
              <ImportButtonExcel onDataImport={handleDataImport} />
              <ExportButtonExcel data={projectData} fileName="exported_data" />
            </Flex>
          </Flex>
          <Button
            style={{ background: "#6366f1", color: "#fff" }}
            className="flex items-center mr-4 mt-4"
            onClick={() => {
              setOpen(!open);
            }}
          >
            <Title
              level={3}
              style={{
                fontWeight: "600",
                color: "#fff",
                marginBottom: "0",
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconPlus width={18} height={18} className="mr-2"></IconPlus> New
            </Title>
          </Button>
        </Flex>
        <div
          style={{
            transition: "height",
            transitionDuration: "500ms",
            transitionTimingFunction: "ease-in-out",
            height: "40px",
            overflow: "hidden",
          }}
          ref={refDiv}
        >
          <Title
            level={3}
            onClick={handleToggleShowSearchBox}
            style={{
              padding: "16px",
              outline: "none",
              fontWeight: "600",
              cursor: "pointer",
              userSelect: "none",
              margin: "0",
            }}
          >
            <Flex align="center">
              <IconChevronDown
                width={20}
                height={20}
                className="mr-2"
              ></IconChevronDown>
              <span style={{ fontWeight: "600", fontSize: "16px" }}>
                Search information
              </span>
            </Flex>
          </Title>
          <div className={`w-3/4 mx-auto mb-4`}>
            <Form
              initialValues={{
                projectId: searchParams.get("projectId") ?? "",
                project_status: searchParams.get("project_status") ?? "",
                project_date: searchParams.get("project_date") ?? "",
              }}
              name="basic"
              onFinish={onFinishSearch}
              onFinishFailed={onFinishSearchFailed}
              autoComplete="off"
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Space>
                    <Form.Item<FieldType>
                      label={
                        <Title
                          level={3}
                          style={{
                            width: "112px",
                            margin: "0",
                          }}
                        >
                          ProjectId
                        </Title>
                      }
                      name="projectId"
                    >
                      <Input placeholder="ProjectId"></Input>
                    </Form.Item>
                  </Space>
                </Col>
                <Col span={12}>
                  <Space>
                    <Form.Item<FieldType>
                      label={
                        <Title
                          level={3}
                          style={{
                            width: "112px",
                            margin: "0",
                          }}
                        >
                          Project Name
                        </Title>
                      }
                      name="project_name"
                    >
                      <Input placeholder="Project Name"></Input>
                    </Form.Item>
                  </Space>
                </Col>
              </Row>

              <Flex
                justify="end"
                style={{ marginTop: "12px", marginRight: "32px" }}
              >
                <Button
                  style={{
                    background: "#ccc",
                    color: "#fff",
                    marginRight: "16px",
                    display: "flex",
                    alignItems: "center",
                  }}
                  htmlType="reset"
                  onClick={() => {
                    setSearchParams({});
                  }}
                >
                  <Title
                    level={3}
                    style={{
                      fontWeight: "600",
                      color: "#fff",
                      padding: "8px 16px",
                      height: "fit-content",
                      margin: "0",
                    }}
                  >
                    Clear
                  </Title>
                </Button>
                <Button
                  style={{
                    background: "#6366f1",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                  }}
                  htmlType="submit"
                >
                  <Title
                    level={3}
                    style={{
                      fontWeight: "600",
                      color: "#fff",
                      padding: "8px 16px",
                      height: "fit-content",
                      margin: "0",
                    }}
                  >
                    Search
                  </Title>
                </Button>
              </Flex>
            </Form>
          </div>
        </div>
        <div
          style={{
            background: "#fff",
            boxShadow:
              "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
            borderRadius: "6px",
          }}
        >
          <Table
            columns={columns}
            dataSource={tableData}
            pagination={{ pageSize: 10 }}
          />
        </div>
      </div>
      <ModalAdd
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        setOpen={setOpen}
        open={open}
        title="Add Project"
      >
        <Space direction="vertical">
          <Form.Item<DataType>
            label={
              <Title
                level={3}
                style={{
                  marginBottom: "0px",
                  width: "90px",
                  textAlign: "left",
                }}
              >
                Project Name
              </Title>
            }
            style={{ marginBottom: "6px" }}
            name="project_name"
            rules={[
              {
                required: true,
                message: "Project Name!",
              },
            ]}
          >
            <Input
              placeholder="Project Name"
              style={{ width: "190px" }}
            ></Input>
          </Form.Item>
          <Form.Item<DataType>
            label={
              <Title
                level={3}
                style={{
                  marginBottom: "0px",
                  width: "90px",
                  textAlign: "left",
                }}
              >
                Status
              </Title>
            }
            style={{ marginBottom: "6px" }}
            name="project_status"
            rules={[
              {
                required: true,
                message: "please select a status!",
              },
            ]}
          >
            <Select
              placeholder="Select a status"
              allowClear
              style={{ width: "190px" }}
            >
              <Select.Option value="Process">Process</Select.Option>
              <Select.Option value="Done">Done</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item<DataType>
            label={
              <Title
                level={3}
                style={{
                  marginBottom: "0px",
                  width: "90px",
                  textAlign: "left",
                }}
              >
                Date
              </Title>
            }
            rules={[
              {
                required: true,
                message: "please pick a day!",
              },
            ]}
            name="project_date"
            style={{ marginBottom: "0" }}
          >
            <DatePicker placeholder="select a day" style={{ width: "190px" }} />
          </Form.Item>
        </Space>
      </ModalAdd>
    </div>
  );
};

export default ProjectPage;
