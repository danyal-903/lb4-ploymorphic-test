import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyThroughRepositoryFactory,
  repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Activity, ActivityLink, Course, CourseRelations} from '../models';
import {ActivityLinkRepository} from './activity-link.repository';
import {ActivityRepository} from './activity.repository';

export class CourseRepository extends DefaultCrudRepository<
  Course,
  typeof Course.prototype.id,
  CourseRelations
> {
  public readonly activities: HasManyThroughRepositoryFactory<
    Activity,
    typeof Activity.prototype.id,
    ActivityLink,
    typeof Course.prototype.id
  >;

  public readonly activityLinks: HasManyRepositoryFactory<ActivityLink, typeof Course.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('ActivityLinkRepository')
    protected activityLinkRepositoryGetter: Getter<ActivityLinkRepository>,
    @repository.getter('ActivityRepository')
    protected activityRepositoryGetter: Getter<ActivityRepository>,
  ) {
    super(Course, dataSource);
    this.activityLinks = this.createHasManyRepositoryFactoryFor('activityLinks', activityLinkRepositoryGetter,);
    this.registerInclusionResolver('activityLinks', this.activityLinks.inclusionResolver);
    this.activities = this.createHasManyThroughRepositoryFactoryFor(
      'activities',
      activityRepositoryGetter,
      activityLinkRepositoryGetter,
    );
    this.registerInclusionResolver(
      'activities',
      this.activities.inclusionResolver,
    );
  }
}
