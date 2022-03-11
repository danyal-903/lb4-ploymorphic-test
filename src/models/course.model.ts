import {hasMany, model, property, RelationType} from '@loopback/repository';
import {ActivityLinkable} from './activity-linkable.model';
import {ActivityLinks} from './activity-links.model';
import {Activity} from './activity.model';

@model()
export class Course extends ActivityLinkable {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @hasMany(() => ActivityLinks)
  activityLinks: ActivityLinks[];

  // @hasMany(() => Activity, {
  //   source: Course,
  //   targetsMany: true,
  //   type: RelationType.hasMany,
  //   through: {
  //     model: () => ActivityLinks,
  //     keyFrom: 'modelId',
  //     keyTo: 'activityId',
  //     polymorphic: {discriminator: 'modelType'},
  //   },
  // })
  // activities: Activity[];

  constructor(data?: Partial<Course>) {
    super(data);
  }
}

export interface CourseRelations {
  // describe navigational properties here
}

export type CourseWithRelations = Course & CourseRelations;
