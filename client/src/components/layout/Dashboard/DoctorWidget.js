import React, { Fragment } from 'react'
import { Card, Col, Row, Tabs, Tab } from 'react-bootstrap'

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator'

export default function DoctorWidget({ prescribedTasks, vitalHistory }) {
    const prescriptionColumns = [{
        dataField: 'prescriptionSchedule',
        text: 'Scheduled on'
    }, {
        dataField: 'prescriptionType',
        text: 'Reminder type'
    }, {
        dataField: 'prescriptionPriority',
        text: 'Priority'
    }, {
        dataField: 'prescriptionMsg',
        text: 'Message'
    }];

    const vitalColumns = [{
        dataField: 'id',
        text: 'Sl. no'
    },{
        dataField: 'measurementDate',
        text: 'Date'
    }, {
        dataField: 'measurementType',
        text: 'Measured vital'
    }, {
        dataField: 'measuredResult',
        text: 'Result'
    }
    
    ];
    const options = {
        // pageStartIndex: 0,
        sizePerPage: 3,
        hideSizePerPage: true
    };
    return (
        <Fragment>

            <Card className="dashboard-box-design mb-3" >

                <Card.Body>
                    <Row >
                        <Col sm="12" >
                            <Tabs defaultActiveKey="patientProfile" transition={false} >
                                <Tab eventKey="patientProfile" title="Robot's reminders" className="mt-4">
                                    <BootstrapTable
                                        pagination={paginationFactory(options)}
                                        keyField="prescriptionSchedule"
                                        data={prescribedTasks}
                                        columns={prescriptionColumns}
                                        striped
                                        hover
                                        condensed
                                    />
                                </Tab>
                                <Tab eventKey="checkupHistory" title="Checkup history" className="mt-4" >
                                    <BootstrapTable
                                        pagination={paginationFactory(options)}
                                        keyField="id"
                                        data={vitalHistory}
                                        columns={vitalColumns}
                                        striped
                                        hover
                                        condensed
                                    />
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>

                </Card.Body>
            </Card >
        </Fragment>
    )
}
