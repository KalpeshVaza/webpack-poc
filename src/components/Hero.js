import React, { Component } from 'react'
import { Card, Col, Row } from 'antd';

export default class Hero extends Component {
    state = {
        loading: true,
        people: []
    };

    async componentDidMount() {
        // http://sc910.sc/api/products/getitems
        const url = "http://sc910.sc/api/products/getitems";
        const response = await fetch(url);
        const data = await response.json();

        this.setState({ people: data, loading: false });
        console.log(data)
    }
    render() {
        if (this.state.loading) {
            return <div>Loading...</div>;
        }
        if (!this.state.people.length) {
            return <div>didn't get a person...</div>;
        }
        return (

            <div className="site-card-wrapper">
                <Row gutter={16}>
                    {this.state.people.map((person, i) => (
                        <Col span={8}>
                            <Card key={i} hoverable style={{ width: 240 }} cover={<img alt="example" src={person.ProductImageUrl} />}>
                                <strong>{person.ProductTitle}</strong>
                                <div dangerouslySetInnerHTML={{ __html: person.ProductDescription }}></div>
                                <a href={person.ProductLink} className="btn btn-primary">{person.ProductLinkText}</a>
                            </Card>
                        </Col>
                    ))}
                </Row>

            </div>

        )
    }
}
