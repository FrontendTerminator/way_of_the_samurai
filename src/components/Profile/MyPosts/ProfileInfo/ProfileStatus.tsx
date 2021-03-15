import React, {ChangeEvent, useState} from "react";
import s from "./ProfileInfo.module.css"

type ProfileInfoType = {
    status: string
    updateStatus: (status: string) => void
}

export class ProfileStatus extends React.Component<ProfileInfoType> {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        // setState меняет локальный стейт и реакт перерисовывает компоненту
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })

    }

    componentDidUpdate(prevProps: Readonly<ProfileInfoType>, prevState: Readonly<{}>, snapshot?: any) {
            if (prevProps.status !== this.props.status) {
                this.setState({
                    status: this.props.status
                })
            }

    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditMode}>{this.props.status || '-----'}</span>
                </div>
                }
                {this.state.editMode &&
                <div>
                    <input
                        onChange={this.onStatusChange}
                        autoFocus={true}
                        onBlur={this.deactivateEditMode}
                        value={this.state.status}
                    />
                </div>
                }
            </div>
        )
    }
}

