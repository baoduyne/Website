

# Booking Medical Schedule Website

## Giới thiệu
Đây là một dự án tạo ra một website đặt lịch hẹn khám bác sĩ. Website được xây dựng bằng các công nghệ như React.js, Express, Bootstrap,....

## Tính năng

- **Đặt lịch khám bệnh**: Người dùng có thể dễ dàng tìm kiếm và đặt lịch khám với các bác sĩ, cơ sở y tế. Hỗ trợ chọn địa điểm, chuyên khoa, thời gian phù hợp.
  
- **Quản lý lịch hẹn**: Người dùng có thể xem, chỉnh sửa hoặc hủy lịch hẹn đã được đặt trước đó.
  
- **Nhận thông báo về lịch hẹn**: Người dùng sẽ nhận được thông báo qua email hoặc tin nhắn về lịch hẹn sắp tới, giúp không bỏ lỡ các cuộc hẹn.
  
- **Đánh giá bác sĩ và dịch vụ**: Sau khi khám, người dùng có thể đánh giá chất lượng dịch vụ và chia sẻ trải nghiệm với bác sĩ.
  
- **Tìm kiếm và so sánh bác sĩ**: Người dùng có thể dễ dàng tìm kiếm và so sánh thông tin về các bác sĩ như chuyên môn, kinh nghiệm, giá cả, đánh giá...
  
- **Đặt lịch khám theo gói dịch vụ**: Ngoài đặt lịch riêng lẻ, người dùng còn có thể đặt trọn gói các dịch vụ y tế như khám tổng quát, kiểm tra sức khỏe định kỳ...
  
- **Quản lý thông tin bác sĩ**:
  - **Tài khoản bác sĩ**: Bác sĩ có thể tự đăng ký tài khoản và quản lý thông tin cá nhân, lịch làm việc.
  - **Quản lý bác sĩ (Tài khoản quản trị)**: Quản trị viên có thể thêm, sửa, xóa thông tin bác sĩ, phân quyền tài khoản.
  - **Quản lý bác sĩ (Tài khoản bệnh viện)**: Bệnh viện có thể quản lý danh sách bác sĩ làm việc tại bệnh viện, cập nhật thông tin, lịch làm việc.



## Cài đặt và sử dụng

1. Clone project về máy
  
3. Cài đặt các dependencies cần thiết:
   ```
   npm install
   ```
4. Tạo file .env và customize theo ý của bạn ( cấu trúc của file .env có trong .env-example...):

## Công nghệ sử dụng
### Front-end
- **Framework**: React.js v17.0.2
- **UI Library**: Chakra UI, Material UI
- **Styling**: Styled Components
- **Routing**: React Router v5.2.0
- **State Management**: Redux, Redux Thunk
- **HTTP Client**: Axios
- **Internationalization**: React Intl
- **Date/Time Handling**: Moment.js, React Datepicker
- **Markdown Editor**: @uiw/react-markdown-editor
- **Carousel**: React Multi Carousel
- **Table/Filter**: React Bootstrap Table Next
- **Image Lightbox**: React Image Lightbox
- **Drawer**: React Modern Drawer
- **Toast Notification**: React Toastify

### Back-end
- **Runtime**: Node.js
- **Web Framework**: Express.js
- **Database**: MySQL, Sequelize ORM
- **Authentication**: bcrypt
- **Email Sending**: Nodemailer
- **Transpiler**: Babel
- **Dev Server**: Nodemon

Với các công nghệ được sử dụng ở cả frontend và backend, dự án này được xây dựng dựa trên kiến trúc fullstack, sử dụng React.js cho phía client và Node.js/Express.js cho phía server. Ngoài ra, có sử dụng các thư viện phổ biến như Redux, Axios, Moment.js, Sequelize... để hỗ trợ các tính năng như quản lý trạng thái, gọi API, xử lý thời gian, kết nối cơ sở dữ liệu.

