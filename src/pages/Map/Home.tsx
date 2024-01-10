import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { useRef } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table } from "antd";
import styled from "styled-components";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const data = [
  {
    no: "1",
    name: "Shin Hi Tower",
    status: "Process",
    date: "22/12/2023",
    detail: (
      <>
        <Link to={`/1/pile`}>
          <button>Detail</button>
        </Link>
      </>
    ),
  },
  {
    no: "2",
    name: "Hong Kong Building",
    status: "Done",
    date: "23/12/2023",
    detail: (
      <>
        <Link to={`/2/pile`}>
          <button>Detail</button>
        </Link>
      </>
    ),
  },
];
const Intern = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const navigate = useNavigate();
  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      //   width: '20%',
      ...getColumnSearchProps("no"),
    },
    {
      title: "Project Name",
      dataIndex: "name",
      key: "name",
      //   width: '30%',
      ...getColumnSearchProps("name"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "staus",
      ...getColumnSearchProps("address"),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      // width: '30%',
      ...getColumnSearchProps("date"),
      sorter: (a, b) =>
        moment(a.date, "DD/MM/YYYY").toDate() -
        moment(b.date, "DD/MM/YYYY").toDate(),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Detail",
      dataIndex: "detail",
      key: "detail",
    },
  ];
  return (
    <Wrapper>
      <Table
        columns={columns}
        dataSource={data}
        onRow={(record) => {
          return {
            onClick: () => {
              navigate(`/${record.no}/pile`);
            },
          };
        }}
        style={{
          margin: "100px",
          border: "1px solid #000",
          borderRadius: "10px",
        }}
      />
    </Wrapper>
  );
};

export default Intern;
const Wrapper = styled.section`
  button {
    padding: 6px 10px;
    margin-right: 5px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #45a048;
  }
`;
