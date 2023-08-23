import React, { ComponentType } from 'react'
import { actions } from '../../redux/dialogs-reducer'
import Dialogs, { DispatchPropsType, MapPropsType } from './Dialogs'
import { connect } from 'react-redux'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
import { RootState } from '../../redux/redux-store'

const mapStateToProps = (state: RootState) => ({
    dialogsPage: state.dialogsPage
})

export default compose<ComponentType>(
    connect<MapPropsType, DispatchPropsType, {}, RootState>(
        mapStateToProps,
        { sendMessage: actions.sendMessage }
    ),
    withAuthRedirect
)(Dialogs)