import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Course, CourseRelations, ActivityLinks, Activity} from '../models';
import {ActivityLinksRepository} from './activity-links.repository';
import {ActivityRepository} from './activity.repository';

export class CourseRepository extends DefaultCrudRepository<
  Course,
  typeof Course.prototype.id,
  CourseRelations
> {

  public readonly activityLinks: HasManyRepositoryFactory<ActivityLinks, typeof Course.prototype.id>;

  public readonly activities: HasManyThroughRepositoryFactory<Activity, typeof Activity.prototype.id,
          ActivityLinks,
          typeof Course.prototype.id
        >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ActivityLinksRepository') protected activityLinksRepositoryGetter: Getter<ActivityLinksRepository>, @repository.getter('ActivityRepository') protected activityRepositoryGetter: Getter<ActivityRepository>,
  ) {
    super(Course, dataSource);
    this.activities = this.createHasManyThroughRepositoryFactoryFor('activities', activityRepositoryGetter, activityLinksRepositoryGetter,);
    this.registerInclusionResolver('activities', this.activities.inclusionResolver);
    this.activityLinks = this.createHasManyRepositoryFactoryFor('activityLinks', activityLinksRepositoryGetter,);
    this.registerInclusionResolver('activityLinks', this.activityLinks.inclusionResolver);
  }
}
