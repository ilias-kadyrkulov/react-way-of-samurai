import React, { FC } from "react";
import Header, { DispatchPropsType, MapPropsType } from "./Header";
import { connect } from "react-redux";
import { logout } from "../../redux/auth-reducer";
import { RootState } from "../../redux/redux-store";

const HeaderContainer: FC<MapPropsType & DispatchPropsType> = (props) => {
  return <Header {...props} />;
};

const mapStateToProps = (state: RootState) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});

export default connect<MapPropsType, DispatchPropsType, {}, RootState>(
  mapStateToProps,
  { logout }
)(HeaderContainer);
