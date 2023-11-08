import React, { useState } from "react";
import { Form, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase.js"; // Import your Firebase storage instance
import axios from "axios";
import useLocalStorage from "@/hooks/useLocalStorage";

const ContractPage = () => {
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);
  const [accessToken] = useLocalStorage("access_token", "");

  const onFinish = async (values) => {
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
        const userData = {
          customer_id: values.customer_id,
          car_id: values.car_id,
          time_booking_start: values.time_booking_start,
          time_booking_end: values.time_booking_end,
          file: downloadURL,
        };
        console.log(userData);
        // Send the user data to your server (e.g., using Axios)
        // axios.post('/api/user', userData);
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/contracts/create`,
            userData,
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

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item label="customer_id" name="customer_id">
        <Input />
      </Form.Item>
      <Form.Item label="car_id" name="car_id">
        <Input />
      </Form.Item>
      <Form.Item label="time_booking_start" name="time_booking_start">
        <Input />
      </Form.Item>
      <Form.Item label="time_booking_end" name="time_booking_end">
        <Input />
      </Form.Item>
      <Form.Item label="Upload PDF" name="pdf">
        <Upload
          beforeUpload={beforeUpload}
          maxCount={1}
          listType="text"
          showUploadList={true}
        >
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ContractPage;
