import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {ActivityLink, ActivityLinkRelations} from '../models';

export class ActivityLinkRepository extends DefaultCrudRepository<
  ActivityLink,
  typeof ActivityLink.prototype.id,
  ActivityLinkRelations
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(ActivityLink, dataSource);
  }
}
