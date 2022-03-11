import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {ActivityLinkable, ActivityLinkableRelations, Activity, ActivityLinks} from '../models';
import {ActivityLinksRepository} from './activity-links.repository';
import {ActivityRepository} from './activity.repository';

export class ActivityLinkableRepository extends DefaultCrudRepository<
  ActivityLinkable,
  typeof ActivityLinkable.prototype.id,
  ActivityLinkableRelations
> {

  public readonly activities: HasManyThroughRepositoryFactory<Activity, typeof Activity.prototype.id,
          ActivityLinks,
          typeof ActivityLinkable.prototype.id
        >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ActivityLinksRepository') protected activityLinksRepositoryGetter: Getter<ActivityLinksRepository>, @repository.getter('ActivityRepository') protected activityRepositoryGetter: Getter<ActivityRepository>,
  ) {
    super(ActivityLinkable, dataSource);
    this.activities = this.createHasManyThroughRepositoryFactoryFor('activities', activityRepositoryGetter, activityLinksRepositoryGetter,);
    this.registerInclusionResolver('activities', this.activities.inclusionResolver);
  }
}
