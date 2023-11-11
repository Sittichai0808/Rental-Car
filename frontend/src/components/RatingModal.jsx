import React from "react";
import { Modal, Button, Input, Rate, notification } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createRating, getRatingByBooking } from "@/apis/ratings.api";
import { GET_RATING_BY_BOOKING } from "@/constants/react-query-key.constant";

const RatingModal = ({ open, handleCancel, bookingId, carId, accessToken }) => {
  const checkRated = useQuery({
    queryKey: [GET_RATING_BY_BOOKING, bookingId],
    queryFn: () => getRatingByBooking(accessToken, bookingId),
    enabled: open, // Chỉ gọi khi modal được mở
    refetchOnWindowFocus: false, // Tắt tự động gọi lại khi cửa sổ focus
  });
  const { TextArea } = Input;
  const [star, setStar] = React.useState(5);
  const [comment, setComment] = React.useState("");

  const { mutate: rate } = useMutation(createRating, {
    onSuccess: () => {
      checkRated.refetch(); // Cập nhật lại dữ liệu đánh giá sau khi thêm mới
    },
  });

  const handleRatingChange = (value) => {
    setStar(value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleRatingSubmit = async () => {
    try {
      await rate({ accessToken, bookingId, carId, star, comment });
      notification.success({
        message: "Đánh giá thành công",
        description: "Cảm ơn bạn đã đánh giá xe!",
      });
      handleCancel();
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Có lỗi xảy ra khi đánh giá. Vui lòng thử lại sau.",
      });
    }
  };

  const hasRatings = checkRated.data?.result.length > 0;

  if (!checkRated.isLoading) {
    if (hasRatings) {
      const { star, comment } = checkRated.data.result[0];

      return (
        <Modal
          open={open}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Hủy
            </Button>,
            <Button key="submit" type="primary">
              Edit
            </Button>,
          ]}
        >
          <div>
            <h3>Đánh giá</h3>
            <div>
              <Rate className="mb-5" disabled allowHalf value={star} /> ({star}{" "}
              sao)
              <TextArea
                value={comment}
                allowClear
                disabled
                className="bg-white"
              />
            </div>
          </div>
        </Modal>
      );
    }

    return (
      <Modal
        open={open}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleRatingSubmit}>
            Đánh giá
          </Button>,
        ]}
      >
        <div className="mt-10">
          <h3>Đánh giá</h3>
          <Rate
            className="mb-5"
            allowHalf
            defaultValue={star}
            onChange={handleRatingChange}
          />
          <div className="flex flex-col">
            <TextArea
              allowClear
              value={comment}
              onChange={handleCommentChange}
            />
          </div>
        </div>
      </Modal>
    );
  }

  return null;
};

export default RatingModal;
