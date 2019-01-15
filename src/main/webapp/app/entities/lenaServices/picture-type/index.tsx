import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PictureType from './picture-type';
import PictureTypeDetail from './picture-type-detail';
import PictureTypeUpdate from './picture-type-update';
import PictureTypeDeleteDialog from './picture-type-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PictureTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PictureTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PictureTypeDetail} />
      <ErrorBoundaryRoute path={match.url} component={PictureType} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PictureTypeDeleteDialog} />
  </>
);

export default Routes;
