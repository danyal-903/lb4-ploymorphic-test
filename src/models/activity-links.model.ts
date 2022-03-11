import {Entity, model, property} from '@loopback/repository';

@model()
export class ActivityLinks extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    required: true,
    type: 'number',
  })
  courseId?: number;

  @property({
    required: true,
    type: 'number',
  })
  modelId?: number;

  @property({
    required: true,
    type: 'string',
  })
  modelType?: string;

  @property({
    type: 'number',
  })
  activityId?: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ActivityLinks>) {
    super(data);
  }
}

export interface ActivityLinksRelations {
  // describe navigational properties here
}

export type ActivityLinksWithRelations = ActivityLinks & ActivityLinksRelations;
