import Radium from 'radium';
import React, {Component, PropTypes} from 'react';
import {Col, Row} from 'react-bootstrap';
import {Form} from 'react-redux-form';

import {editModes} from 'lib/business-site-utils';
import * as colors from 'lib/colors';

import FormInput from 'components/FormInput';

const styles = {
    footerContainer: {
        backgroundColor: colors.templateFooterBg
    },
    footerCol: {
        color: colors.lightGrey,
        fontSize: 14,
        '@media screen and (max-width: 991px)': {
            marginBottom: 20
        }
    },
    footerColTitle: {
        fontSize: 18,
        textTransform: 'uppercase',
        color: colors.white
    },
    footerPayment: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '10px 0',
        '@media screen and (max-width: 767px)': {
            justifyContent: 'flex-start'
        }
    },
    imgPayment: {
        display: 'inline-block',
        maxWidth: '50px',
        height: 'auto',
        marginRight: 10,
        marginBottom: 5
    },
    footerColLogo: {
        color: colors.white,
        fontSize: 15,
        textAlign: 'right',
        float: 'right'
    },
    imgResponsive: {
        display: 'inline',
        height: 'auto',
        maxWidth: '160px'
    },
    bottomFooterWrp: {
        backgroundColor: colors.templateBottomFooterBg,
        color: colors.grey,
        fontSize: 12
    },
    bottomFooter: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 0',
        '@media screen and (max-width: 500px)': {
            flexDirection: 'column',
            alignItems: 'flex-start'
        }
    },
    bottomLegal: {
        '@media screen and (max-width: 767px)': {
            paddingTop: '10px'
        }
    }
};

class Footer extends Component {
    static propTypes = {
        buildSiteMode: PropTypes.number,
        footerInfo: PropTypes.object.isRequired,
        form: PropTypes.object
    };

    renderTextField (isEditMode, fieldName, placeholder, readNode) {
        return isEditMode ? (
            <FormInput
                field={this.props.form[fieldName]}
                inputType='text'
                model={`businessSite.siteConfig.footer.${fieldName}`}
                placeholder={placeholder}
                inputStyle={{
                    color: colors.darkGrey,
                    fontWeight: '300'
                }}
                style={{margin: 0, width: '100vw'}}
            />
        ) : readNode;
    }

    renderLink (buildSiteMode, path, children, style) {
        return (
            <a href={buildSiteMode ? null : path} style={style}>
                {children}
            </a>
        );
    }

    renderBottomFooter (isEditMode, buildSiteMode) {
        return (
            <div style={styles.bottomFooterWrp}>
                <div className='container-fluid'>
                    <div style={styles.bottomFooter}>
                        <div>
                            {this.renderTextField(isEditMode, 'bottom', '© 2017 Nome Azienda - PIVA: 0123456789',
                                <span style={styles.bottomLegal}>{this.props.footerInfo.bottom}</span>
                            )}
                        </div>
                        <div>
                            {this.renderLink(buildSiteMode, '#', 'Privacy Policy', {color: colors.lightGrey})}
                            {this.renderLink(buildSiteMode, '#', 'Termini e Condizioni', {color: colors.lightGrey})}
                        </div>
                    </div>

                </div>
            </div>
        );
    }

    render () {
        const {companyName, line1, line2, line3, line4} = this.props.footerInfo;
        const {buildSiteMode} = this.props;
        const isEditMode = buildSiteMode === editModes.EDIT_TEXTS;
        return (
            <div style={styles.footerContainer}>
                <Form model={'businessSite.siteConfig.footer'}>
                    <div className='container-fluid'>
                        <Row style={{padding: '20px 0', color: colors.lightGrey}}>
                            <Col xs={12} sm={6}>
                                <div style={styles.footerCol}>
                                    {this.renderTextField(isEditMode, 'companyName', 'Nome Azienda',
                                        <span style={styles.footerColTitle}>
                                            {companyName}
                                        </span>
                                    )}
                                    <br />
                                    {this.renderTextField(isEditMode, 'line1', 'Via Giosuè Carducci, 10', line1)}
                                    <br />
                                    {this.renderTextField(isEditMode, 'line2', '20100 Milano (MI)', line2)}
                                    <br />
                                    {this.renderLink(
                                        buildSiteMode,
                                        'mailto:info@maildisupporto.it',
                                        this.renderTextField(isEditMode, 'line3', 'Email: info@maildisupporto.it', line3),
                                        {color: colors.lightGrey}
                                    )}
                                    <br />
                                    {this.renderTextField(isEditMode, 'line4', 'Tel: 012-3456789', line4)}
                                </div>
                            </Col>
                            <Col xs={12} sm={6}>
                                <div style={styles.footerCol}>
                                    <div style={styles.footerPayment}>
                                        <img src='../_assets/images/template_01/payment01.png' style={styles.imgPayment} />
                                        <img src='../_assets/images/template_01/payment02.png' style={styles.imgPayment} />
                                        <img src='../_assets/images/template_01/payment03.png' style={styles.imgPayment} />
                                        <img src='../_assets/images/template_01/payment04.png' style={styles.imgPayment} />
                                    </div>
                                </div>
                                <div style={styles.footerColLogo}>
                                    <span>
                                        {'Developed With'}
                                    </span>
                                    {this.renderLink(
                                        buildSiteMode,
                                        '#',
                                        (<div>
                                            <img src='../_assets/images/common/logo.png' style={styles.imgResponsive} />
                                        </div>)
                                    )}
                                </div>
                            </Col>
                        </Row>
                    </div>
                    {this.renderBottomFooter(isEditMode)}
                </Form>
            </div>
        );
    }
}

export default Radium(Footer);
