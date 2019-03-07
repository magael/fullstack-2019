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

  if (message === "") return <div />;

  return <div style={style}>{message}</div>;
};

export default connect()(Notification);
