import { getBookings } from "@/apis/admin-bookings.api";
import { GET_BOOKINGS_KEY } from "@/constants/react-query-key.constant";
import { AdminLayout } from "@/layouts/AdminLayout";
import { formatCurrency } from "@/utils/number.utils";
import moment from "moment";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../firebase.js"; // Import your Firebase storage instance
import axios from "axios";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useMutation } from "@tanstack/react-query";
import {
  CloudUploadOutlined,
  PlusOutlined,
  SearchOutlined,
  UserAddOutlined,
  PlusCircleOutlined,
  UploadOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  MinusCircleOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import {
  Avatar,
  message,
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Select,
  Table,
  Upload,
  Space,
} from "antd";
import { useEffect, useState, useCallback, useRef } from "react";

import Highlighter from "react-highlight-words";
import { useRouter } from "next/router";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { saveAs } from "file-saver";
import { useUserState } from "@/recoils/user.state.js";
import ConvertAPI from "convertapi";

let PizZipUtils = null;
if (typeof window !== "undefined") {
  import("pizzip/utils/index.js").then(function (r) {
    PizZipUtils = r;
  });
}

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}

export default function AdminManageBookings() {
  const [form] = Form.useForm();
  const [user, setUser] = useUserState();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [file, setFile] = useState(null);
  const [accessToken] = useLocalStorage("access_token", "");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [bookings, setBookings] = useState({});
  const searchInput = useRef(null);

  const router = useRouter();

  const generateDocument = () => {
    loadFile(
      "https://firebasestorage.googleapis.com/v0/b/rental-945b7.appspot.com/o/pdfs%2Fhop_dong.docx?alt=media&token=fa09173a-80e1-4972-aad4-747f2784ddab",
      function (error, content) {
        if (error) {
          throw error;
        }
        var zip = new PizZip(content);
        var doc = new Docxtemplater().loadZip(zip);
        doc.setData({
          address: bookings.address,
          fullName: bookings.username,
          phone: bookings.phone,

          phoneNumber: user?.result.phoneNumber,
          nameStaff: user?.result.username,
          role: user?.result.role === "staff" ? "Nhân viên" : "Quản lý",

          model: bookings.model,
          yearManufacture: bookings.yearManufacture,
          numberSeat: bookings.numberSeat,
          numberCar: bookings.numberCar,
          totalCost: bookings.totalCost,
          timeBookingStart: bookings.timeBookingStart,
          timeBookingEnd: bookings.timeBookingEnd,
        });
        try {
          // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
          doc.render();
        } catch (error) {
          // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
          function replaceErrors(key, value) {
            if (value instanceof Error) {
              return Object.getOwnPropertyNames(value).reduce(function (
                error,
                key
              ) {
                error[key] = value[key];
                return error;
              },
              {});
            }
            return value;
          }
          console.log(JSON.stringify({ error: error }, replaceErrors));

          if (error.properties && error.properties.errors instanceof Array) {
            const errorMessages = error.properties.errors
              .map(function (error) {
                return error.properties.explanation;
              })
              .join("\n");
            console.log("errorMessages", errorMessages);
            // errorMessages is a humanly readable message looking like this :
            // 'The tag beginning with "foobar" is unopened'
          }
          throw error;
        }

        var out = doc.getZip().generate({
          type: "blob",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });

        saveAs(out, "hợp_đồng.docx");
      }
    );
  };

  const handleChange = (pagination, filters) => {
    setFilteredInfo(filters);
  };
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
            close
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

  const onSubmit = async (values) => {
    try {
      //     const convertapi = new ConvertAPI('HwQQ18bFTPBXQcoj', { conversionTimeout: 60 });

      //     convertapi.convert('pdf', { File: file })
      // .then(function(result) {
      //   // get converted file url
      //   console.log("Converted file url: " + result.file.url);

      //   // save to file
      //   return result.file.save('/path/to/save/file.pdf');
      // })
      // .then(function(file) {
      //   console.log("File saved: " + file);
      // })
      // .catch(function(e) {
      //   console.error(e.toString());
      // });
      const filename = file.name;
      const storageRef = ref(storage, "pdfs/" + filename); // 'pdfs/' is the folder in storage

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on("state_changed", (snapshot) => {});

      uploadTask.then(async (snapshot) => {
        const downloadURL = await getDownloadURL(storageRef);

        try {
          setTimeout(() => {
            setOpen(false);
          }, 1000);
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/contracts/create/${values._id}`,
            { file: downloadURL },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );

          if (response.status === 201) {
            message.success("Create Contract successfully");
            router.reload();
          } else {
            // Handle API errors and display an error message
            message.error("Error submitting the form. Please try again later.");
          }
        } catch (apiError) {
          console.error("Error calling the API: ", apiError);
          message.error("Error submitting the form. Please try again later.");
        }
      });
      // save to file
      // return result.file.save("/path/to/save/file.pdf");

      // if (!file) {
      //   message.error("Please upload a file.");
      //   return;
      // }
    } catch (error) {
      console.error("Error uploading PDF: ", error);
      message.error("Error submitting the form. Please try again later.");
    }
  };

  const { mutate } = useMutation(onSubmit);

  const beforeUpload = (file) => {
    // Check if the uploaded file is a PDF
    if (
      file.type === "application/pdf" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      setFile(file);
      return false; // Prevent the default upload action
    }

    message.error("Only PDF files are allowed.");
    return false;
  };

  const showModal = (booking) => {
    setOpen(true);
    setBookings({ ...booking });

    form.setFieldsValue({ ...booking });
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 1000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const { data } = useQuery({
    queryFn: getBookings,
    queryKey: [GET_BOOKINGS_KEY],
  });

  console.log(data?.result);

  const dataSource = data?.result.map((item, idx) => ({
    id: idx + 1,
    _id: item._id,
    thumb: item?.carId?.thumb,
    numberCar: item?.carId?.numberCar,
    model: item?.carId?.model?.name,

    numberSeat: item?.carId?.numberSeat,
    yearManufacture: item?.carId?.yearManufacture,
    username: item?.bookBy?.username,

    phone: item?.phone,

    address: item?.address,

    totalCost: formatCurrency(item?.totalCost),

    timeBookingStart: moment(item?.timeBookingStart).format("DD-MM-YYYY HH:mm"),
    timeBookingEnd: moment(item?.timeBookingEnd).format("DD-MM-YYYY HH:mm"),

    codeTransaction: item?.codeTransaction,
    timeTransaction: item?.timeTransaction,
    status: item?.status,
  }));

  return (
    <>
      <div className="pt-14">
        <Table
          // onChange={handleChange}
          scroll={{ x: 2400 }}
          columns={[
            { key: "id", title: "ID", dataIndex: "id", width: "2%" },
            {
              key: "thumb",
              title: "Thumbnail",
              dataIndex: "thumb",

              render: (url) => (
                <Image
                  className="h-32 aspect-video rounded-md object-cover"
                  src={url}
                />
              ),
            },

            {
              key: "numberCar",
              title: "No. Seat",
              dataIndex: "numberCar",
              ...getColumnSearchProps("numberCar"),
            },
            {
              key: "username",
              title: "Customer",
              dataIndex: "username",
              ...getColumnSearchProps("username"),
            },

            {
              key: "phone",
              title: "Phone Number",
              dataIndex: "phone",
              ...getColumnSearchProps("phone"),
            },
            {
              key: "address",
              title: "Address",
              dataIndex: "address",
              ...getColumnSearchProps("address"),
            },
            {
              key: "totalCost",
              title: "Total Cost",
              dataIndex: "totalCost",
              ...getColumnSearchProps("totalCost"),
            },
            {
              key: "timeBookingStart",
              title: "Time Booking Start",
              dataIndex: "timeBookingStart",
            },
            {
              key: "timeBookingEnd",
              title: "Time Booking End",
              dataIndex: "timeBookingEnd",
            },
            {
              key: "codeTransaction",
              title: "Code Transaction",
              dataIndex: "codeTransaction",
            },
            {
              key: "timeTransaction",
              title: "Time Transaction",
              dataIndex: "timeTransaction",
            },

            {
              key: "status",
              title: "Status",
              dataIndex: "status",
              fixed: "right",
              // width: "%",
              filters: [
                {
                  text: "Chưa Có Hợp Đồng",
                  value: "Chưa có hợp đồng",
                },
                {
                  text: "Đã Có Hợp Đồng",
                  value: "Đã có hợp đồng",
                },
                {
                  text: "Đã Hủy",
                  value: "Đã hủy",
                },
              ],
              // filteredValue: filteredInfo.status || null,
              onFilter: (value, record) => record.status.includes(value),

              // ellipsis: true,
              render: (status) => (
                <>
                  {status === "Chưa có hợp đồng" ? (
                    <>
                      <p className="text-red-500 justify-center">
                        <MinusCircleOutlined
                          style={{
                            color: "red",
                            fontSize: "12px",
                            marginRight: "5px",
                          }}
                        />
                        Chưa Có Hợp Đồng
                      </p>
                    </>
                  ) : status === "Đã có hợp đồng" ? (
                    <>
                      <p className="text-green-600">
                        <CheckCircleOutlined
                          style={{
                            color: "green",
                            fontSize: "12px",
                            marginRight: "5px",
                          }}
                        />
                        Đã Có Hợp Đồng
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-red-500 flex justify-center ">
                        <ExclamationCircleOutlined
                          style={{
                            color: "red",
                            fontSize: "12px",
                            marginRight: "5px",
                          }}
                        />
                        Đã Hủy
                      </p>
                    </>
                  )}
                </>
              ),
            },
            {
              key: "action",
              title: "Action",
              fixed: "right",
              width: "10%",
              render: (_, booking) => (
                <div className="flex gap-2">
                  <Button
                    type="primary"
                    className=" border border-solid border-green-400 "
                    onClick={() => showModal(booking)}
                  >
                    <PlusCircleOutlined style={{ fontSize: "14px" }} />
                    Hợp Đồng
                  </Button>
                  <Popconfirm
                    title="Are you sure to deactivate this car?"
                    okText="Deactivate"
                  >
                    <Button className="bg-red-500 text-white border-none hover:bg-red-500/70">
                      <DeleteOutlined style={{ fontSize: "14px" }} />
                      Hủy
                    </Button>
                  </Popconfirm>
                </div>
              ),
            },
          ]}
          dataSource={dataSource}
          rowKey="id"
        />
      </div>
      <Modal
        title="Tạo Hợp Đồng"
        open={open}
        onOk={handleOk}
        footer={null}
        width={700}
        onCancel={handleCancel}
      >
        <>
          <Form
            form={form}
            onFinish={(values) => {
              mutate(values);
            }}
            layout="vertical"
            className="flex gap-4 mt-10"
          >
            <div className="w-2/3">
              <Form.Item label="Tên khách hàng" name="username">
                <Input />
              </Form.Item>
              <Form.Item label="Số điện thoại" name="phone">
                <Input />
              </Form.Item>
              <Form.Item label="Địa chỉ" name="address">
                <Input />
              </Form.Item>
              <Form.Item label="Biển số xe" name="numberCar">
                <Input />
              </Form.Item>
              <Form.Item label="Thời gian bắt đầu thuê" name="timeBookingStart">
                <Input />
              </Form.Item>
              <Form.Item label="Thời gian kết thúc thuê" name="timeBookingEnd">
                <Input />
              </Form.Item>
              <Form.Item label="Tổng giá tiền thuê" name="totalCost">
                <Input />
              </Form.Item>
              <Form.Item label="Booking id" hidden name="_id">
                <Input />
              </Form.Item>
              <div className=" mt-10">
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </div>
            </div>

            <div className="grow">
              <Button
                type="primary"
                shape="round"
                icon={<DownloadOutlined />}
                onClick={generateDocument}
                className="px-8 mt-7 mb-4"
              >
                {" "}
                Hợp đồng
              </Button>

              <Form.Item label="" name="file">
                <Upload
                  beforeUpload={beforeUpload}
                  maxCount={1}
                  listType="text"
                  showUploadList={true}
                >
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
              </Form.Item>
            </div>
          </Form>
        </>
      </Modal>
    </>
  );
}

AdminManageBookings.Layout = AdminLayout;
