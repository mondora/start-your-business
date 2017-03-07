import React, {Component, PropTypes} from 'react';
import {Col, Row, Button} from 'react-bootstrap';
import {Form} from 'react-redux-form';

import {editModes, getTextAreaField, getTextField} from 'lib/business-site-utils';
import * as colors from 'lib/colors';

const commonStyles = {
    introWrp: {
        textAlign: 'center',
        margin: '60px 0'
    },
    introTextStyle: {
        fontSize: '1.4em',
        color: colors.templateGreyText
    }
};

export default class Intro extends Component {
    static propTypes = {
        buildSiteMode: PropTypes.number,
        buttonStyle: PropTypes.object,
        form: PropTypes.object,
        introTitleStyle: PropTypes.object,
        siteConfig: PropTypes.object.isRequired
    };

    renderTextField (isEditMode, fieldName, placeholder, readNode) {
        return getTextField (
            isEditMode,
            this.props.form[fieldName],
            `businessSite.siteConfig.intro.${fieldName}`,
            placeholder,
            readNode,
            {textAlign: 'center', color: colors.templateGreyText},
            {margin: 0, width: '100vw'}
        );
    }

    renderTextareaField (isEditMode, fieldName, placeholder, readNode) {
        return getTextAreaField (
            isEditMode,
            this.props.form[fieldName],
            `businessSite.siteConfig.intro.${fieldName}`,
            placeholder,
            readNode,
            {color: colors.templateGreyText, textAlign: 'center'},
            {margin: 0, width:'100%'}
        );
    }

    render () {
        const {introTitle, introText} = this.props.siteConfig.intro;
        const {buildSiteMode, introTitleStyle, buttonStyle} = this.props;
        const isEditMode = buildSiteMode === editModes.EDIT_TEXTS;
        return (
            <Form model={'businessSite.siteConfig.intro'}>
                <Row>
                    <Col xs={12} style={commonStyles.introWrp}>
                        <h2 style={introTitleStyle}>
                            {this.renderTextField(isEditMode, 'introTitle', 'CASSETTINE BIOLOGICHE', introTitle)}
                        </h2>
                        <p style={commonStyles.introTextStyle}>
                            {this.renderTextareaField(isEditMode, 'introText', 'Scegliamo i prodotti migliori e te li consegnamo a casa nella formula più adatta alle tue esigenze!', introText)}
                        </p>
                        <Button style={buttonStyle}>
                            {'INIZIA ORA!'}
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}
