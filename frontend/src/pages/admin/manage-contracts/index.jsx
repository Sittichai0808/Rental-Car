"use client";
import { getBookings } from "@/apis/admin-bookings.api";
import {
  GET_BOOKINGS_KEY,
  GET_CONTRACTS_KEY,
} from "@/constants/react-query-key.constant";
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
  MinusCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
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
} from "antd";
import { useEffect, useState } from "react";
import { getContracts } from "@/apis/admin-contracts.api.js";
import { Worker } from "@react-pdf-viewer/core";
// Import the main component
import { Viewer } from "@react-pdf-viewer/core";

// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";

import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Import styles
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
export default function AdminManageContracts() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const [urlFile, setUrlFile] = useState("");

  const [form] = Form.useForm();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState(null);
  const [accessToken] = useLocalStorage("access_token", "");
  // useEffect(() => {}, [infoContract]);
  const onSubmit = async (values) => {
    try {
      if (!file) {
        message.error("Please upload a PDF file.");
        return;
      }

      // Handle file upload to Firebase Cloud Storage
      const filename = file.name;
      const storageRef = ref(storage, "pdfs/" + filename); // 'pdfs/' is the folder in storage

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on("state_changed", (snapshot) => {
        // Handle upload progress, if needed
      });

      uploadTask.then(async (snapshot) => {
        // Handle successful upload, e.g., save download URL to the database
        const downloadURL = await getDownloadURL(storageRef);

        // You can now use downloadURL to store in your MongoDB or perform other actions

        // You may also want to send the user's information to your Node.js server

        // Send the user data to your server (e.g., using Axios)
        // axios.post('/api/user', userData);
        try {
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
            // Display a success message to the user
            message.success("Create Contract successfully");
          } else {
            // Handle API errors and display an error message
            message.error("Error submitting the form. Please try again later.");
          }
        } catch (apiError) {
          console.error("Error calling the API: ", apiError);
          message.error("Error submitting the form. Please try again later.");
        }
      });
    } catch (error) {
      console.error("Error uploading PDF: ", error);
      message.error("Error submitting the form. Please try again later.");
    }
  };

  const { mutate } = useMutation(onSubmit);

  const beforeUpload = (file) => {
    // Check if the uploaded file is a PDF
    if (file.type !== "application/pdf") {
      message.error("Only PDF files are allowed.");
      return false;
    }

    // Update the state with the selected file
    setFile(file);
    return false; // Prevent the default upload action
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModalView = (contract) => {
    setIsModalOpen(true);
    console.log(contract.file);

    setUrlFile(contract.file);
  };

  const handleOkView = () => {
    setIsModalOpen(false);
  };

  const handleCancelView = () => {
    setIsModalOpen(false);
  };

  const showModal = (booking) => {
    setOpen(true);

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
    queryKey: [GET_CONTRACTS_KEY, accessToken],
    queryFn: async () => await getContracts(accessToken),
  });

  console.log(data?.result);

  const dataSource = data?.result.map((item, idx) => ({
    id: idx + 1,
    _id: item?._id,
    createBy: item?.createBy?.username,
    bookBy: item?.bookingId?.bookBy?.username,
    email: item?.bookingId?.bookBy?.email,
    phone: item?.bookingId?.phone,
    address: item?.bookingId?.address,
    timeBookingStart: moment(item?.bookingId?.timeBookingStart).format(
      "DD-MM-YYYY HH:mm"
    ),
    timeBookingEnd: moment(item?.bookingId?.timeBookingEnd).format(
      "DD-MM-YYYY HH:mm"
    ),
    totalCost: formatCurrency(item?.bookingId?.totalCost),
    file: item?.file,
    status: item?.status,
  }));

  return (
    <>
      <div className="pt-10">
        <div className="mb-4 flex justify-between items-center">
          <div className="max-w-[30%] flex gap-2 items-center">
            <Input prefix={<SearchOutlined />} />
            <Button type="primary">Search</Button>
          </div>
        </div>

        <Table
          scroll={{ x: 2400 }}
          columns={[
            { key: "id", title: "ID", dataIndex: "id", width: "2%" },
            {
              key: "createBy",
              title: "Người Tạo Hợp Đồng",
              dataIndex: "createBy",
            },
            { key: "bookBy", title: "Tên Khách Hàng", dataIndex: "bookBy" },
            {
              key: "status",
              title: "Trạng Thái",
              dataIndex: "status",
              render: (status) => (
                <>
                  {status === "Đang thực hiện" ? (
                    <>
                      <p className="text-green-500">
                        <MinusCircleOutlined
                          style={{
                            color: "green",
                            fontSize: "12px",
                            marginRight: "5px",
                          }}
                        />
                        Đang Thực Hiện
                      </p>
                    </>
                  ) : status === "Đã tất toán" ? (
                    <>
                      <p className="text-green-600">
                        <CheckCircleOutlined
                          style={{
                            color: "green",
                            fontSize: "12px",
                            marginRight: "5px",
                          }}
                        />
                        Đã Tất Toán
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-red-500">
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

            { key: "email", title: "Thư Điện Tử", dataIndex: "email" },

            {
              key: "phone",
              title: "Số Điện Thoại",
              dataIndex: "phone",
            },
            {
              key: "addres",
              title: "Điạ Chỉ",
              dataIndex: "address",
            },
            {
              key: "totalCost",
              title: "Tổng Số Tiền",
              dataIndex: "totalCost",
            },
            {
              key: "timeBookingStart",
              title: "Thời Gian Bắt Đầu",
              dataIndex: "timeBookingStart",
            },
            {
              key: "timeBookingEnd",
              title: "Thời Gian Kết Thúc",
              dataIndex: "timeBookingEnd",
            },

            // {
            //   key: "thumb",
            //   title: "Thumbnail",
            //   dataIndex: "thumb",
            //   render: (url) => (
            //     <div>
            //       <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
            //         <Page pageNumber={pageNumber} />
            //       </Document>
            //       <p>
            //         Page {pageNumber} of {numPages}
            //       </p>
            //     </div>
            //   ),
            //  },

            {
              key: "action",
              title: "Action",
              fixed: "right",
              width: "8%",
              render: (_, contract) => (
                <div className="flex gap-2">
                  <Button
                    type="primary"
                    className=" border border-solid border-green-400 "
                    onClick={() => showModalView(contract)}
                  >
                    <EyeOutlined style={{ fontSize: "14px" }} />
                  </Button>
                  <Button
                    type="primary"
                    className=" border border-solid border-green-400 "
                    onClick={() => showModal(contract)}
                  >
                    <PlusCircleOutlined style={{ fontSize: "14px" }} />
                  </Button>
                  <Popconfirm
                    title="Are you sure to deactivate this car?"
                    okText="Deactivate"
                  >
                    <Button className="bg-red-500 text-white border-none hover:bg-red-500/70">
                      <DeleteOutlined style={{ fontSize: "14px" }} />
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
              <Form.Item label="Upload PDF" name="file">
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

      <Modal
        title="Hợp Đồng"
        open={isModalOpen}
        onOk={handleOkView}
        footer={null}
        width={1000}
        onCancel={handleCancelView}
      >
        <div>
          {/* <Loader isLoading={isLoading} /> */}
          <section
            id="pdf-section"
            className="d-flex flex-column align-items-center w-100"
          >
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js">
              <Viewer
                fileUrl={urlFile}
                plugins={[defaultLayoutPluginInstance]}
              />
            </Worker>
            {/* <embed
              type="application/pdf"
              src={urlFile}
              width={100 + "%"}
              height={100 + "%"}
            /> */}
          </section>
        </div>
      </Modal>
    </>
  );
}

AdminManageContracts.Layout = AdminLayout;
