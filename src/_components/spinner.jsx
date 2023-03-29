import React, { useState } from "react";
import { Space, Spin } from "antd";
import { loadingContext } from "../context/loadingContext";
import Modal from "react-bootstrap/Modal";
export default function Spinner({ children }) {
   const [loading, setLoading] = useState(false);
   return (
      <loadingContext.Provider
         value={{
            loading,
            setLoading,
         }}
      >
         <Modal
            show={loading}
            style={{
               width: "100%",
               display: "flex",
               justifyContent: "center",
               height: "100%",
               zIndex: "99999999999",
            }}
         >
            <Spin
               tip="Loading"
               size="large"
               style={{ marginTop: "300px", zIndex: "9999999999", color: "fff" }}
            >
               <div className="content" />
            </Spin>
         </Modal>
         {children}
      </loadingContext.Provider>
   );
}
