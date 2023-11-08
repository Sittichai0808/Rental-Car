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

export default function AdminManageBookings() {
  const [form] = Form.useForm();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState(null);
  const [accessToken] = useLocalStorage("access_token", "");
  // useEffect(() => {}, [infoContract]);
  const onSubmit = (values) => {
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
            `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/contracts/create`,
            values,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );

          if (response.status === 200) {
            // Display a success message to the user
            message.success("Form submitted successfully");
          } else {
            // Handle API errors and display an error message
            message.error("Error submitting the form. Please try again later.");
          }
        } catch (apiError) {
          console.error("Error calling the API: ", apiError);
          message.error("Error submitting the form. Please try again later.");
        }
        // Display a success message to the user
        message.success("Form submitted successfully");
      });
    } catch (error) {
      console.error("Error uploading PDF: ", error);
      message.error("Error submitting the form. Please try again later.");
    }
  };

  const mutation = useMutation(onSubmit);
  const onFinish = (values) => {
    mutation.mutate(values);
  };

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

  const showModal = (booking) => {
    setOpen(true);

    form.setFieldsValue({ ...booking });
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
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
    username: item?.bookBy?.username,
    phone: item?.phone,
    address: item?.address,

    totalCost: formatCurrency(item?.totalCost),

    timeBookingStart: moment(item?.timeBookingStart).format("DD-MM-YYYY HH:mm"),
    timeBookingEnd: moment(item?.timeBookingEnd).format("DD-MM-YYYY HH:mm"),

    codeTransaction: item?.codeTransaction,
    timeTransaction: item?.timeTransaction,
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

            { key: "numberCar", title: "No. Seat", dataIndex: "numberCar" },
            { key: "username", title: "Customer", dataIndex: "username" },

            {
              key: "phone",
              title: "Phone Number",
              dataIndex: "phone",
            },
            {
              key: "address",
              title: "Address",
              dataIndex: "address",
            },
            {
              key: "totalCost",
              title: "Total Cost",
              dataIndex: "totalCost",
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
            onFinish={onFinish}
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
              <div className=" mt-10">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={mutation.isLoading}
                >
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
    </>
  );
}

AdminManageBookings.Layout = AdminLayout;
