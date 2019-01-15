import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPictureType } from 'app/shared/model/lenaServices/picture-type.model';
import { getEntities as getPictureTypes } from 'app/entities/lenaServices/picture-type/picture-type.reducer';
import { getEntity, updateEntity, createEntity, reset } from './picture.reducer';
import { IPicture } from 'app/shared/model/lenaServices/picture.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPictureUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IPictureUpdateState {
  isNew: boolean;
  pictureTypeId: string;
}

export class PictureUpdate extends React.Component<IPictureUpdateProps, IPictureUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      pictureTypeId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getPictureTypes();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { pictureEntity } = this.props;
      const entity = {
        ...pictureEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/picture');
  };

  render() {
    const { pictureEntity, pictureTypes, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="lenaGatewayApp.lenaServicesPicture.home.createOrEditLabel">
              <Translate contentKey="lenaGatewayApp.lenaServicesPicture.home.createOrEditLabel">Create or edit a Picture</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : pictureEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="picture-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="codeLabel" for="code">
                    <Translate contentKey="lenaGatewayApp.lenaServicesPicture.code">Code</Translate>
                  </Label>
                  <AvField
                    id="picture-code"
                    type="text"
                    name="code"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="pathLabel" for="path">
                    <Translate contentKey="lenaGatewayApp.lenaServicesPicture.path">Path</Translate>
                  </Label>
                  <AvField
                    id="picture-path"
                    type="text"
                    name="path"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="pictureType.id">
                    <Translate contentKey="lenaGatewayApp.lenaServicesPicture.pictureType">Picture Type</Translate>
                  </Label>
                  <AvInput id="picture-pictureType" type="select" className="form-control" name="pictureTypeId">
                    <option value="" key="0" />
                    {pictureTypes
                      ? pictureTypes.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/picture" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  pictureTypes: storeState.pictureType.entities,
  pictureEntity: storeState.picture.entity,
  loading: storeState.picture.loading,
  updating: storeState.picture.updating,
  updateSuccess: storeState.picture.updateSuccess
});

const mapDispatchToProps = {
  getPictureTypes,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PictureUpdate);
