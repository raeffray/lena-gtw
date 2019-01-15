import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './picture.reducer';
import { IPicture } from 'app/shared/model/lenaServices/picture.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPictureDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PictureDetail extends React.Component<IPictureDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { pictureEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="lenaGatewayApp.lenaServicesPicture.detail.title">Picture</Translate> [<b>{pictureEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="code">
                <Translate contentKey="lenaGatewayApp.lenaServicesPicture.code">Code</Translate>
              </span>
            </dt>
            <dd>{pictureEntity.code}</dd>
            <dt>
              <span id="path">
                <Translate contentKey="lenaGatewayApp.lenaServicesPicture.path">Path</Translate>
              </span>
            </dt>
            <dd>{pictureEntity.path}</dd>
            <dt>
              <Translate contentKey="lenaGatewayApp.lenaServicesPicture.pictureType">Picture Type</Translate>
            </dt>
            <dd>{pictureEntity.pictureTypeId ? pictureEntity.pictureTypeId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/picture" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/picture/${pictureEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ picture }: IRootState) => ({
  pictureEntity: picture.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PictureDetail);
