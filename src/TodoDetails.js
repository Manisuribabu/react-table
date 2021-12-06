import React from "react";

function TableDetails(props) {
    // const [complete,setComplete]=React.useState([props.todoDetails]);
  return (
    <>
      {props.todoDetails.map((row) => {
          debugger
        return (
          <>
            <h1 className="post-title">todo title</h1>

            <div className="title-email">
              <p>UserName : {row.username}:</p>
              <p>Email : {row.email}:</p>
            </div>
            <div className="title-details">
              <div className="title-font">Title : {row.title}</div>
              <div className="body-font">completed : {row.completed
                              ? "completed"
                              : "not completed"}</div>
              
            </div>
          </>
        );
      })}
    </>
  );
}
export default TableDetails;
