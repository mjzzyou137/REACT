import React, { useState, useEffect } from "react";
import Axios from 'axios'
const BaiTap = ({ MaKhoaHoc }) => {
  let [arrExercise, setArrExercise] = useState([]);
  let [ file , setFile ] = useState('')
  useEffect(() => {
    if (localStorage.getItem("arrExercise")) {
      const localExercise = JSON.parse(localStorage.getItem("arrExercise"));
      let arr = localExercise.filter(item => {
        return item.maKhoaHoc === MaKhoaHoc;
      });
      setArrExercise(arr);
    }
  }, []);
  const renderListExercise = data => {
    return data.map((item, index) => {
      return (
        <div className="container-thong-bao-bai-tap" key={index}>
          <div
            className="d-flex justify-content-between item"
            data-toggle="collapse"
            data-target={`#${item.target}`}
          >
            <p>
              <i className="fas fa-briefcase" /> {item.tieuDe}
            </p>
            <p>(+)</p>
          </div>
          <div id={item.target} className="collapse">
            <div>
              <p>Deadline : {item.deadline}</p>
              <p>Mô tả : {item.moTa}</p>
              <p>Link : {item.link}</p>
            </div> 
          </div>
        </div>
      );
    });
  };
  const onChange = e => {
    let files = e.target.files
    let reader = new FileReader();
    reader.readAsDataURL(files[0])
    reader.onload=(e)=>{  
      const formData = { file: e.target.result}
      Axios({
        method:'POST',
        url: "http://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/UploadHinhAnhKhoaHoc",
        data:formData 
      }).then(res=> console.log("result",res))
    }
  }
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <h3>Bài tập</h3>
          {arrExercise.length !== 0 ? (
            renderListExercise(arrExercise)
          ) : (
            <h1 className="mt-3" style={{ color: "#19224D" }}>
              Chưa có bài tập
            </h1>
          )}
          {/*  */}
        </div>
      </div>
      <div>
        {/* Modal */}
        <div
          className="modal fade"
          id="modelId"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="modelTitleId"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-dark">NỘP BÀI TẬP</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label className="text-dark">Nhận xét</label>
                    <textarea
                      className="form-control"
                      rows={6}
                      defaultValue={""}
                    />
                  </div>
                  <div className="custom-file">
                    <input
                      type="file"
                      name="file"
                      onChange={(event)=>onChange(event)}
                      className="custom-file-input"
                      id="validatedCustomFile"
                      required
                    />
                    <label
                      className="custom-file-label"
                      htmlFor="validatedCustomFile"
                    >
                      Choose file...
                    </label>
                  </div>
                  <button className="btn btn-primary float-right mt-2" >NỘP BÀI TẬP</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BaiTap;
