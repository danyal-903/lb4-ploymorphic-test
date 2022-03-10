import {Entity, hasMany, model, property} from '@loopback/repository';
import {ActivityLink} from './activity-link.model';
import {Activity} from './activity.model';

@model()
export class Course extends Entity {
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
  title: string;

  @hasMany(() => Activity, {
    through: {
      model: () => ActivityLink,
      keyFrom: 'modelId',
      keyTo: 'activityId',
      polymorphic: {discriminator: 'modelType'},
    },
  })
  activities: Activity[];

  constructor(data?: Partial<Course>) {
    super(data);
  }
}

export interface CourseRelations {
  // describe navigational properties here
}

export type CourseWithRelations = Course & CourseRelations;
