﻿import * as React from 'react';
import * as RB from 'react-bootstrap';
import * as OZ from '../';
import * as Models from "../../models"
import { action, observable } from "mobx";
import { observer } from 'mobx-react';

interface Props {
}
interface State {
}

@observer export class Nodes extends React.Component<Props, State> {
    private nodeStore = new Models.MonitoringStore();

    @observable selectedNode: Models.NodeItem = null;

    componentDidMount() {
        this.nodeStore.getNodesFromServer();
    }
    componentWillUnmount() {
    }

    public render() {
        if (this.selectedNode == null)
            return (
                <table className="table table-bordered table-hover dataTable" role="grid">
                    <thead>
                        <tr role="row">
                            <th className="sorting_asc">Machine Name</th>
                            <th className="sorting">Node Id</th>
                            <th className="sorting">Active processes count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.nodeStore.nodes.map(f => <OZ.NodeRow node={f} key={f.nodeId} onSelectedNode={(x) => this.selectedNode = x} />)}
                    </tbody>
                </table>)
        else
            return (
                <div>
                    <button type="button" className="btn btn-default btn-sm" onClick={() => this.selectedNode = null}>
                        <i className="fa fa-chevron-left"></i> Back
                        </button>
                    <br /><br />
                    <table className="table table-bordered table-hover dataTable" role="grid">
                        <thead>
                            <tr role="row">
                                <th className="sorting_asc">Task Name</th>
                                <th className="sorting">Is running</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.selectedNode.backgroundTasks.map(f => <OZ.TaskRow task={f} key={f.taskId} />)}
                        </tbody>
                    </table>
                </div>
            );
    }
}