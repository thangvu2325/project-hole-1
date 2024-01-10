import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { useRef } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table } from "antd";
import styled from "styled-components";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const data = [
  {
    key: "",
    no: "1",
    pileNo: "MP1A",
    pileLocation: "MPLocation/MP1A.png",
    status: "Completed",
    diameter: "250mm",
    raked: "Vertical",
  },
  {
    key: "",
    no: "1",
    pileNo: "MP1B",
    pileLocation: "MPLocation/MP1B.png",
    status: "Not Completed",
    diameter: "250mm",
    raked: "Vertical",
  },
];
const Intern = () => {
  const { no } = useParams();
  const filteredData = data.filter((item) => item.no === no);
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
      title: "Project No.",
      dataIndex: "no",
      key: "no",
      //   width: '20%',
      ...getColumnSearchProps("no"),
    },
    {
      title: "Pile No",
      dataIndex: "pileNo",
      key: "pileNo",
      //   width: '30%',
      ...getColumnSearchProps("pileNo"),
    },
    {
      title: "Pile Location",
      dataIndex: "pileLocation",
      key: "pileLocation",
      ...getColumnSearchProps("pileLocation"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      // width: '30%',
      ...getColumnSearchProps("status"),
      // sorter: (a, b) => moment(a.date, 'DD/MM/YYYY').toDate() - moment(b.date, 'DD/MM/YYYY').toDate(),
      // sortDirections: ['descend', 'ascend'],
    },
    {
      title: "Diameter",
      dataIndex: "diameter",
      key: "diameter",
      ...getColumnSearchProps("diameter"),
    },
    {
      title: "Raked",
      dataIndex: "raked",
      key: "raked",
      ...getColumnSearchProps("raked"),
    },
  ];
  return (
    <Wrapper>
      <Table
        columns={columns}
        dataSource={filteredData.map((item) => {
          return {
            ...item,
            key: item.no,
          };
        })}
        onRow={(record) => {
          return {
            onClick: () => {
              navigate(`/detail/${record.pileNo}`);
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
  };

  button:hover {
    background-color: #45a048;
  }
`;
