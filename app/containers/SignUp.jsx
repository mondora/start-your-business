import Radium from 'radium';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Col, Row} from 'react-bootstrap';

import {signUpUser} from 'actions/user';
import * as colors from 'lib/colors';

import SignUpForm from 'components/SignUpForm';
import PageTeaser from 'components/PageTeaser';
import FeaturesIcons from 'components/FeaturesIcons';

const styles = {
    rowStyle: {
        marginBottom: '60px',
        '@media screen and (min-width: 767px)': {
            margin: '20px auto 60px auto'
        }
    },
    title: {
        margin: 0,
        color: colors.primaryColor,
        fontWeight: 800,
        fontSize: 'calc(30px + 1vw)',
        lineHeight: 'calc(30px + 1vw)'
    }
};

class SignUpContainer extends Component {
    static propTypes = {
        signUpUser: PropTypes.func.isRequired,
        signupForm: PropTypes.object,
        user: PropTypes.object
    };

    getFeaturesIcons () {
        return [
            {
                icon: 'payment_grey',
                title: 'PAGAMENTI SICURI',
                text:
                    `Pagamento tramite i metodi più conosciuti
                    e sicuri al 100%.`
            },
            {
                icon: 'lock_grey',
                title: 'NESSUN VINCOLO',
                text:
                    `Potrai decidere di recidere il tuo contratto
                    in qualsiasi momento.`
            },
            {
                icon: 'customizable_grey',
                title: 'INTERAMENTE PERSONALIZZABILE',
                text:
                    `Puoi modificare i colori, e tutti i testi del template
                    che sceglierai, in modo che si adatti alla riconoscibilità
                    già acquisita dal tuo marchio.`
            },
            {
                icon: 'phone_grey',
                title: 'MOBILE FRIENLY',
                text:
                    `Tutti i Template Wallabusiness sono usufruibili
                    da smartphone e tablet.`
            },
            {
                icon: 'assistance_grey',
                title: 'SUPPORTO COSTANTE',
                text:
                    `Ti risponderemo via mail per ogni domanda e per fornirti
                    l’aiuto necessario per iniziare ora il tuo business.`
            }
        ];
    }

    render () {
        return (
            <div>
                <PageTeaser
                    pageTitle={'REGISTRATI'}
                />
                <div className='container'>
                    <Row style={styles.rowStyle}>
                        <Col xs={12} md={6} mdPush={6}>
                            <SignUpForm
                                form={this.props.signupForm}
                                signUpUser={this.props.signUpUser}
                                signupState={this.props.user.signup}
                            />
                        </Col>
                        <Col xs={12} md={6} mdPull={6} style={{padding: '10px 25px'}}>
                            <h2 style={styles.title}>{'TI ASSICURIAMO:'}</h2>
                            {this.getFeaturesIcons().map((featureIcon, index) =>
                                <div key={index} style={{paddingTop: 20, paddingBottom: 20}}>
                                    <FeaturesIcons
                                        icon={featureIcon.icon}
                                        iconStyle={{
                                            display: 'block',
                                            width: 55,
                                            float: 'left',
                                            marginTop: '-8px'
                                        }}
                                        title={featureIcon.title}
                                        titleColor={colors.darkGrey}
                                        textColor={colors.darkGrey}
                                        textStyle={{
                                            width: 'calc(100% - 55px)',
                                            float: 'left',
                                            marginBottom: 20,
                                            paddingLeft: '6px'
                                        }}
                                        text={featureIcon.text}
                                    />
                                </div>
                            )}
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        signupForm: state.userSignupForm,
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signUpUser: bindActionCreators(signUpUser, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Radium(SignUpContainer));
