import React from "react";
import { connect } from 'react-redux'

const Notification = props => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  };

  const message = props.notification;
  console.log(message ,"adsads")

  if (message === "") return <div />;

  return <div style={style}>{message}</div>;
};

export default Notification

// export default connect(
//   null,
//   null
// )(Notification);
