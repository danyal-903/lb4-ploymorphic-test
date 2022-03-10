import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Course,
  ActivityLink,
} from '../models';
import {CourseRepository} from '../repositories';

export class CourseActivityLinkController {
  constructor(
    @repository(CourseRepository) protected courseRepository: CourseRepository,
  ) { }

  @get('/courses/{id}/activity-links', {
    responses: {
      '200': {
        description: 'Array of Course has many ActivityLink',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ActivityLink)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ActivityLink>,
  ): Promise<ActivityLink[]> {
    return this.courseRepository.activityLinks(id).find(filter);
  }

  @post('/courses/{id}/activity-links', {
    responses: {
      '200': {
        description: 'Course model instance',
        content: {'application/json': {schema: getModelSchemaRef(ActivityLink)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Course.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ActivityLink, {
            title: 'NewActivityLinkInCourse',
            exclude: ['id'],
            optional: ['courseId']
          }),
        },
      },
    }) activityLink: Omit<ActivityLink, 'id'>,
  ): Promise<ActivityLink> {
    return this.courseRepository.activityLinks(id).create(activityLink);
  }

  @patch('/courses/{id}/activity-links', {
    responses: {
      '200': {
        description: 'Course.ActivityLink PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ActivityLink, {partial: true}),
        },
      },
    })
    activityLink: Partial<ActivityLink>,
    @param.query.object('where', getWhereSchemaFor(ActivityLink)) where?: Where<ActivityLink>,
  ): Promise<Count> {
    return this.courseRepository.activityLinks(id).patch(activityLink, where);
  }

  @del('/courses/{id}/activity-links', {
    responses: {
      '200': {
        description: 'Course.ActivityLink DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ActivityLink)) where?: Where<ActivityLink>,
  ): Promise<Count> {
    return this.courseRepository.activityLinks(id).delete(where);
  }
}
