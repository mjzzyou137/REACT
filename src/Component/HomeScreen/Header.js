import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { actFetchLoginUser } from "../../Store/Actions/User";
import ItemHeader from "./Header/ItemHeader";
import SweetAlert from "sweetalert-react";

const Header = ({ onGetUser, listCourse, lstCart }) => {
  let [lstDanhMuc, setLstDanhMuc] = useState([]);
  let [listCart, setListCart] = useState([]);
  let [isClick, setIsClick] = useState(false);
  let [isCart, setIsCart] = useState(false);
  let [totalPrice , setTotalPrice ] = useState()
  useEffect(() => {
    localStorage.getItem("loginUser") &&
      onGetUser(JSON.parse(localStorage.getItem("loginUser")));
    localStorage.getItem("danhMucKhoaHoc") &&
      setLstDanhMuc(JSON.parse(localStorage.getItem("danhMucKhoaHoc")));

    // cart
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
    lstCart && setListCart(lstCart);
  }, [lstCart]);
  const LogOut = () => {
    onGetUser({});
    localStorage.removeItem("loginUser");
    setIsClick(true);
  };
  const renderAdmin = () => {
    if (
      JSON.parse(localStorage.getItem("loginUser")).maLoaiNguoiDung === "GV"
    ) {
      return (
        <Link
          to="/admin"
          className="dropdown-item"
          style={{ cursor: "pointer" }}
        >
          Quản trị hệ thống
        </Link>
      );
    }
  };
  const renderUserHeader = () => {
    if (localStorage.getItem("loginUser")) {
      return (
        <>
          <a
            className="nav-link dropdown-toggle d-flex align-items-center"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <div className="headerUser">
              <div className="avatarUser">
                <img
                  src="https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-male-3-512.png"
                  alt="img"
                />
              </div>
              <span id="username-header" className="username">
                {JSON.parse(localStorage.getItem("loginUser")).hoTen}
              </span>
            </div>
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link
              to={`/user/change-information/${
                JSON.parse(localStorage.getItem("loginUser")).taiKhoan
              }`}
              className="dropdown-item"
              style={{ cursor: "pointer" }}
            >
              Thay đổi tin cá nhân
            </Link>
            <Link
              to={`/user/${
                JSON.parse(localStorage.getItem("loginUser")).taiKhoan
              }`}
              className="dropdown-item"
              style={{ cursor: "pointer" }}
            >
              Khóa học của tôi
            </Link>
            {renderAdmin()}
            <div className="dropdown-divider" />
            <Link
              to="/"
              className="dropdown-item"
              style={{ cursor: "pointer" }}
              onClick={() => {
                LogOut();
              }}
            >
              Đăng xuất
            </Link>
          </div>
        </>
      );
    }
    return (
      <>
        <li className="nav-item">
          <Link to="/signup" className="nav-link" id="dang-ky">
            Đăng ký
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/signin" className="nav-link" id="dang-nhap">
            Đăng nhập
          </Link>
        </li>
      </>
    );
  };

  const renderListCategory = data => {
    return data.map((item, index) => {
      return <ItemHeader isCart={isCart} key={index} item={item} />;
    });
  };
  const renderListCart = data => {
    return data.map((item, index) => {
      return (
        <li key={index}>
          <div className="img-1">
            <img src={item.hinhAnh} />
          </div>
          <div className="content">
            <p>{item.tenKhoaHoc}</p>
            <h5>${item.luotXem}.99</h5>
          </div>
        </li>
      );
    });
  };
  useEffect(()=>{
    setTotalPrice(listCart.reduce((total,item) => total + (item.luotXem*1 + 0.99),0 ))
  },[listCart]) 
  return (
    <>
      <SweetAlert
        show={isClick}
        title="ĐĂNG XUẤT THÀNH CÔNG"
        text=""
        onConfirm={() => {
          window.location.reload();
          setIsClick(false);
        }}
      /> 
      <header id="navbar">
        <nav className="navbar navbar-expand-lg navbar-light bg-gradient-secondary pt-3">
          <h1>
            <Link id="logo" to="/" className="navbar-brand">
              Passion
            </Link>
          </h1>
          <button
            className="navbar-toggler ml-md-auto"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto d-flex align-items-center">
              <li
                className="nav-item active"
                style={{ borderBottom: "1px soild #555555" }}
              >
                <Link
                  id="index"
                  to="/"
                  className="nav-link"
                  onClick={() => {
                    if (!listCourse) {
                      window.scroll({
                        top: 0,
                        behavior: "smooth"
                      });
                    }
                  }}
                >
                  Trang chủ
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item  my-lg-0 my-3">
                <button className="btn" disabled={listCourse}>
                  <Link
                    id="list-course"
                    to="/list-course/all"
                    className="nav-link"
                    onClick={() => {
                      if (!listCourse) {
                        window.scroll({
                          top: 640,
                          behavior: "smooth"
                        });
                      }
                    }}
                  >
                    Danh sách khóa học
                  </Link>
                </button>
              </li>

              <li
                className="nav-item mr-3 my-lg-0 my-3 cart"
                onClick={() => {
                  if(localStorage.getItem("loginUser")){
                    if(listCart.length !== 0){
                      setIsCart(!isCart)
                    }  
                  } 
                }}
              >
                <i class="fas fa-shopping-cart"></i>
                <div className={listCart.length === 0 ? "d-none" : "circle"}>
                  {listCart.length !== 0 ? listCart.length : ""}
                </div>
                <div>
                <div className={isCart ? "arrow-cart" : "d-none"}></div>
                <div className={isCart ? "information-cart" : "d-none"}>
                  <ul>{renderListCart(listCart)}</ul>
                  <div className="footer-information-cart">
                    <p>Tổng tiền : <span style={{fontSize:'20px'}}>${totalPrice}</span></p>
                    <button className="btn">
                      ĐI ĐẾN GIỎ HÀNG
                    </button>
                  </div>
                </div>
                </div>
              </li>
              <li className="nav-item dropdown d-flex">{renderUserHeader()}</li>
            </ul>
          </div>
        </nav>
        <ul
          id="scroll-header"
          className="scroll-header"
          style={
            !isCart ? { justifyContent: "center" } : { justifyContent: "unset" }
          }
        >
          {renderListCategory(lstDanhMuc)}
        </ul>
      </header>
    </>
  );
};
const mapStateToProps = state => {
  return {
    user: state.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onGetUser: user => dispatch(actFetchLoginUser(user))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
