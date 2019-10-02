import React, { useEffect, useState } from "react";
import Header from "../Component/HomeScreen/Header";
import Footer from "../Component/HomeScreen/Footer";
import "./DetailCourseHomeScreen.scss";
import CourseService from "../Services/Course";
import img from "../assets/DetailCourseHome/cuuthanhvien.png";
import img1 from "../assets/HomeScreen/avatar_1.jpg";
import img2 from "../assets/HomeScreen/avatar_2.jpg";
import img3 from "../assets/HomeScreen/avatar_3.jpg";
import SweetAlert from "sweetalert-react";
const DetailCourseHomeScreen = ({ match }) => {
  let [detailCourse, setDetailCourse] = useState({});
  let [listCart, setListCart] = useState([]);
  let [isCart, setIsCart] = useState(false);
  let [ isClick ,setIsClick ] = useState(false)
  let [ isLogin ,setIsLogin ] = useState(false)
  useEffect(() => {
    CourseService.fetchCourseDetail(match.params.id).then(res => {
      setDetailCourse(res.data);
      console.log(res.data);
    });

    // Cart
    let loginUser = localStorage.getItem("loginUser");
    let ListCart = localStorage.getItem("listCart");
    if (ListCart && loginUser) {
      setListCart(
        JSON.parse(ListCart).filter(
          item => item.taiKhoan === JSON.parse(loginUser).taiKhoan
        )
      );
    }
  }, []);
  useEffect(() => {
    if (listCart) {
      listCart.map(item => {
        if (item.maKhoaHoc === match.params.id) {
          setIsCart(true);
        }
      });
    }
    console.log(12);
  }, [listCart]);
  const onAddCart = data => {
    // set if user
    let loginUser = localStorage.getItem("loginUser");
    if (loginUser) {
      data = {
        ...data,
        taiKhoan: JSON.parse(localStorage.getItem("loginUser")).taiKhoan
      };
      let index = listCart.findIndex(item => {
        return item.tenKhoaHoc === data.tenKhoaHoc;
      });
      index === -1 && setListCart([...listCart, data]);
      setIsClick(true)
    } else setIsLogin(true)
  };
  useEffect(() => {
    listCart.length !== 0 &&
      localStorage.setItem("listCart", JSON.stringify(listCart));
  }, [listCart]);
  return (
    <div className="detail-course-home-screen">
      <SweetAlert 
    show={isClick}
    title="THÊM VÀO GIỎ THÀNH CÔNG"
    text=""
    onConfirm={() => {
        setIsClick(false)  
    }}
  />
       <SweetAlert 
    show={isLogin}
    title="Vui lòng đăng nhập"
    text=""
    onConfirm={() => {
        setIsLogin(false)  
    }}
  />
      <Header lstCart={listCart} />
      <div className="banner-detail">
        <div className="banner-content">
          <h2>{detailCourse.tenKhoaHoc}</h2>
          <p>
            <i class="fas fa-angle-double-right"></i> Bạn đang tìm một nghề đang
            HOT nhất và mức lương cao hiện nay?{" "}
          </p>
          <p>
            <i class="fas fa-angle-double-right"></i> Bạn đang tìm một công việc
            mới theo đam mê của bạn?{" "}
          </p>
          <p>
            <i class="fas fa-angle-double-right"></i> Bạn muốn bắt đầu một nghề
            mới cho mình nhưng chưa biết bắt đầu từ đâu?{" "}
          </p>
          <p>
            <i class="fas fa-angle-double-right"></i> Bạn cần một trung tâm
            chuyên nghiệp, học xong có việc ngay, đáp ứng mọi nhu cầu tuyển dụng
            của doanh nghiệp ?{" "}
          </p>
        </div>
      </div>
      <div className="container">
        <div className="container-detail">
          <div className="left">
            <div className="content">
              <h3 style={{ marginBottom: "10px", textTransform: "uppercase" }}>
                TẠI SAO NGHỀ LẬP TRÌNH {detailCourse.tenKhoaHoc} LẠI HOT ? NGHỀ {detailCourse.tenKhoaHoc} LÀM GÌ ? LƯƠNG NHIÊU?
              </h3>
              <p>
                Giờ đây, các bạn chỉ cần gõ từ Lập trình <span style={{textTransform:'uppercase'}}>{detailCourse.tenKhoaHoc}</span> hay <span style={{textTransform:'uppercase'}}>{detailCourse.tenKhoaHoc}</span>{" "}
                developer, các bạn sẽ thấy hàng triệu kết quả xuất hiện.{" "}
              </p>
              <br />
              <p>
                Nó là cái gì mà sao hot vậy? Tất cả các sản phẩm website, cái
                'ăn tiền' đối với khách hàng chính là bề ngoài của sản phẩm. Mặc
                cho cái 'beck ăn - backend" nó có cao siêu bao nhiêu đi chăng
                nữa, nó có cả triệu chức năng cũng không quan tâm luôn. Bởi vì
                cái mà khách hàng thấy, cái mà người dùng 'sờ mó' cảm nhận được
                là cái bề ngoài bóng bẩy của nó và sự tiện dụng, dễ xài của nó.
              </p>
              <br />
              <p>
                {" "}
                Do vậy, muốn sản phẩm nhiều người xài, nhiều ngừoi truy cập, anh
                phải trau chút cái Giao diện bên ngoài, phải làm thật sự tiện
                dụng mới được, không thì sản phẩm của anh bị dẹp ngay, và công
                ty anh làm 'sập tiệm' .{" "}
              </p>
              <br />
              <p>
                Mà đừng cứ tưởng là{" "}
                <span style={{ textTransform: "uppercase" }}>
                  {detailCourse.tenKhoaHoc}
                </span>{" "}
                De-ve-lốp là ngồi cắt layout là xong, cái này dễ như ăn bánh
                nhé. Mà dễ vậy sao nhiều vị trí đến lương cả vài ngàn củ
                Do-nan-trump được ? Phải có lý do đúng không nào?{" "}
                <span style={{ textTransform: "uppercase" }}>
                  {detailCourse.tenKhoaHoc}
                </span>{" "}
                ngoài việc trau chút HTML, CSS, Cắt layout, đây chỉ là chuyện
                phụ thôi, cái chính là code Javascript, code Jquery, code Ajax,
                Json, rồi xài framework như Angular, như React JS,... Ăn tiền
                hay không là nằm ở chỗ này nhé các bạn.
              </p>{" "}
              <br />{" "}
              <p>
                Và thứ cực kì quan trọng nữa, đó chính là kỹ năng năng giải
                quyết vấn đề, kỹ năng đưa bài toán thực tế vào lập trình là cực
                kì quan trọng của một thằng 'dev bro' , toàn chỉ nghe là học
                ngôn ngữ này, ngôn ngữ nọ, mà kỹ năng này không có thì khó mà
                lên chức cao nổi.
              </p>{" "}
              <br />{" "}
              <p>
                {" "}
                Đây là sự sống còn của 'thằng' dev. Mà các món này ở trường ko
                có đâu, vài chỗ thì lung tung, Passion Academy biết được cái nào
                là tốt nhất cho các bạn, cái nào là học xong demo được, trình
                chiếu được, khoe với thiên hạ được, nghiên cứu chuyên sâu lên
                được, tự tin với nhà tuyển dụng, xem CV là 'hốt ngay'.
              </p>
              <br />
            </div>
            <div className="content mt-2">
              <h5
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "white",
                  background: "#19224d",
                  padding: "10px 0"
                }}
              >
                Các công ty cựu thành viên đang làm việc
              </h5>
              <div
                style={{
                  width: "100%",
                  marginTop: "48px",
                  paddingBottom: "62.8px"
                }}
              >
                <img style={{ width: "100%", height: "100%" }} src={img} />
              </div>
            </div>
          </div>
          <div className="right">
            <div className="content">
              <div className="avatar-course">
                <img src={detailCourse.hinhAnh} />
              </div>
              <div className="detail">
                <h3 className="text-center">${detailCourse.luotXem}.99</h3>
                <button
                  className="add-to-cart"
                  onClick={() => onAddCart(detailCourse)}
                  disabled={isCart}
                >
                  {isCart ? "Đã được thêm vào giỏ" : "Thêm vào giỏ"}
                </button>
                <button className="buy-now">Mua ngay</button>
                <p>
                  Tên khóa học :{" "}
                  <span style={{ textTransform: "uppercase" }}>
                    {detailCourse.tenKhoaHoc}
                  </span>
                </p>
                <p> Ngày tạo : {detailCourse.ngayTao}</p>
                <p>Lượt xem : {detailCourse.luotXem}</p>
                <p>Mô tả : {detailCourse.moTa}</p>
                <p>
                  Giảng viên :{" "}
                  {detailCourse.nguoiTao ? detailCourse.nguoiTao.hoTen : ""}
                </p>
              </div>
            </div>
            <div
              className="content mt-5 font-weight-bold text-center"
              style={{
                fontSize: "20px",
                background: "#19224d",
                color: "white"
              }}
            >
              Cựu thành viên
            </div>
            <div className="content-2 mt-2">
              <div className="img">
                <img src={img2} />
              </div>
              <div className="feed-back">
                <h5>Nguyễn Thế Mẫn</h5>
                <p>
                  {" "}
                  Tôi học được rất nhiều từ kỹ năng làm việc, các kỹ thuật
                  chuyên sâu và kỹ năng mềm tại các khóa học của Passion.{" "}
                </p>
              </div>
            </div>
            <div className="content-2 mt-2">
              <div className="img">
                <img src={img3} />
              </div>
              <div className="feed-back">
                <h5>Nguyễn Trung Hiếu</h5>
                <p>
                  Tôi đã tìm đến với Passion và nay tôi đã có được công việc
                  đúng mong đợi của mình tại Viivue
                </p>
              </div>
            </div>
            <div className="content-2 mt-2">
              <div className="img">
                <img src={img1} />
              </div>
              <div className="feed-back">
                <h5>Nguyễn Thiện Hảo</h5>
                <p>
                  Tôi vô cùng hài lòng với công việc hiện tại của tôi tại Global
                  CyberSoft.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailCourseHomeScreen;
