import {Entity, hasMany, model, property} from '@loopback/repository';
import {ActivityLinks} from './activity-links.model';
import {Activity} from './activity.model';

@model()
export class ActivityLinkable extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @hasMany(() => Activity, {
    through: {
      model: () => ActivityLinks,
      keyFrom: 'modelId',
      keyTo: 'activityId',
      polymorphic: {discriminator: 'modelType'},
    },
  })
  activities: Activity[];
  // // Define well-known properties here

  constructor(data?: Partial<ActivityLinkable>) {
    super(data);
  }
}

export interface ActivityLinkableRelations {
  // describe navigational properties here
}

export type ActivityLinkableWithRelations = ActivityLinkable &
  ActivityLinkableRelations;
