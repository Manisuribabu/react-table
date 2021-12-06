import React from "react";

function TableDetails(props) {
    // const [complete,setComplete]=React.useState([props.todoDetails]);
  return (
    <>
      {props.dataDetails.map((row) => {
        return (
          <>
            <h1 className="post-title">Post title</h1>

            <div className="title-email">
              <p>UserName : {row.username}:</p>
              <p>Email : {row.email}:</p>
            </div>
            <div className="title-details">
              <div className="title-font">Title : {row.title}</div>
              <div className="body-font">Body : {row.body}</div>
              
            </div>
          </>
        );
      })}
    </>
  );
}
export default TableDetails;
