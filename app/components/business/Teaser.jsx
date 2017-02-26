import React, {Component, PropTypes} from 'react';
import {Col, Row, Carousel} from 'react-bootstrap';

import {editModes, getS3ImagePath} from 'lib/business-site-utils';
import * as colors from 'lib/colors';

import ImageUploader from 'components/ImageUploader';
import SaveButton from 'components/BuildSiteSaveButton';

const styles = {
    teaserWrp: {
        maxWidth: '1200px',
        height: 'auto'
    }
};

export default class Teaser extends Component {
    static propTypes = {
        buildSiteMode: PropTypes.number,
        images: PropTypes.array.isRequired
    };

    renderUploadForm () {
        return (
            <div style={{backgroundColor: colors.grey}}>
                <p style={{fontSize: 18, marginTop: 20}}>
                    {'PUOI SCEGLIERE FINO A TRE IMMAGINI PER IL TEASER'}
                    <br />
                    {'ATTENZIONE! ALMENO UNA È OBBLIGATORIA'}
                </p>
                <ImageUploader />
                <ImageUploader />
                <ImageUploader />
                <SaveButton />
            </div>
        );
    }

    renderCarousel () {
        return (
            <Carousel>
                {this.props.images.map(img =>
                    <Carousel.Item
                        key={img.id}
                    >
                        <img src={img.id ? getS3ImagePath(img.id) : './_assets/images/template_01/carousel01.jpg'} />
                    </Carousel.Item>
                )}
            </Carousel>
        );
    }

    render () {
        return (
            <div className='container-fluid' style={styles.teaserWrp}>
                <Row>
                    <Col xs={12}>
                        {(() => {
                            switch (this.props.buildSiteMode) {
                                case editModes.UPLOAD_IMAGES:
                                    return this.renderUploadForm();
                                case editModes.EDIT_TEXTS: //TODO
                                default:
                                    return this.renderCarousel();
                            }
                        })()}
                    </Col>
                </Row>
            </div>
        );
    }
}
