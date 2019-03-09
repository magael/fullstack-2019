import React from "react";
import { connect } from "react-redux";

const Notification = props => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  };

  const message = props.visibleNotification;

  if (message === "") return <div />;

  return <div style={style}>{message}</div>;
};

const currentNotification = ({ notification }) => {
  return notification;
};

const mapStateToProps = state => {
  return {
    visibleNotification: currentNotification(state)
  };
};

export default connect(
  mapStateToProps,
  null
)(Notification);
