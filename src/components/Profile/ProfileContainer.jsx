import React from 'react'
import Profile from './Profile';
import { connect } from 'react-redux';
import { getProfileId, getUserStatus, updateStatus } from '../../redux/profile-reducer';
import { useNavigate, useParams } from 'react-router-dom'
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

export const withRouter = (Component) => (props) => {
    const params = useParams();
    const navigate = useNavigate();

    return (
        <Component
            {...props}
            params={params}
            navigate={navigate}
        />
    );
}

class ProfileContainer extends React.Component {

    updateProfile() {
        let userId = this.props.params.userId;

        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.navigate.push('/login');
            }
        }

        this.props.getProfileId(userId)
        this.props.getUserStatus(userId)
    }

    componentDidMount() {
        this.updateProfile()
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.params.userId != prevProps.params.userId) {
            this.updateProfile()
        }
    }

    render() {
        return <Profile {...this.props}
            profile={this.props.profile}
            status={this.props.status}
            updateStatus={this.props.updateStatus} />
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth
})

export default compose(
    withRouter,
    connect(mapStateToProps, { getProfileId, getUserStatus, updateStatus }),
    withAuthRedirect
)(ProfileContainer)

// withAuthRedirect(connect(mapStateToProps, { getProfileId })(withRouter(ProfileContainer)))