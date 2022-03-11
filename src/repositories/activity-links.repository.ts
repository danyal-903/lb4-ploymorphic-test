import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {ActivityLinks, ActivityLinksRelations} from '../models';

export class ActivityLinksRepository extends DefaultCrudRepository<
  ActivityLinks,
  typeof ActivityLinks.prototype.id,
  ActivityLinksRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(ActivityLinks, dataSource);
  }
}
