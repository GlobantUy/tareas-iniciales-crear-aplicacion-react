import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import LoadingSpinner from './Spinner';

class TableUser extends Component {

    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        const { loading } = this.state
        return (
            <div>
                { loading ? <LoadingSpinner /> : <div />}
                <center>
                    <h1>En proceso...</h1>
                </center>
            </div>
        )
    }
}
export default TableUser
