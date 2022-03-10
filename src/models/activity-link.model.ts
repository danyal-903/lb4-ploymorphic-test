import {Entity, hasMany, model, property} from '@loopback/repository';
import {Course} from './course.model';

@model()
export class ActivityLink extends Entity {
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
  modelType: string;

  @property({
    type: 'number',
    required: true,
  })
  modelId: number;

  @property({
    type: 'number',
    required: true,
  })
  activityId: number;

  @hasMany(() => Course)
  courseId: Course;
  constructor(data?: Partial<ActivityLink>) {
    super(data);
  }
}

export interface ActivityLinkRelations {
  // describe navigational properties here
}

export type ActivityLinkWithRelations = ActivityLink & ActivityLinkRelations;
