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
  ActivityLinks,
} from '../models';
import {CourseRepository} from '../repositories';

export class CourseActivityLinksController {
  constructor(
    @repository(CourseRepository) protected courseRepository: CourseRepository,
  ) { }

  @get('/courses/{id}/activity-links', {
    responses: {
      '200': {
        description: 'Array of Course has many ActivityLinks',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ActivityLinks)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ActivityLinks>,
  ): Promise<ActivityLinks[]> {
    return this.courseRepository.activityLinks(id).find(filter);
  }

  @post('/courses/{id}/activity-links', {
    responses: {
      '200': {
        description: 'Course model instance',
        content: {'application/json': {schema: getModelSchemaRef(ActivityLinks)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Course.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ActivityLinks, {
            title: 'NewActivityLinksInCourse',
            exclude: ['id'],
            optional: ['courseId']
          }),
        },
      },
    }) activityLinks: Omit<ActivityLinks, 'id'>,
  ): Promise<ActivityLinks> {
    return this.courseRepository.activityLinks(id).create(activityLinks);
  }

  @patch('/courses/{id}/activity-links', {
    responses: {
      '200': {
        description: 'Course.ActivityLinks PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ActivityLinks, {partial: true}),
        },
      },
    })
    activityLinks: Partial<ActivityLinks>,
    @param.query.object('where', getWhereSchemaFor(ActivityLinks)) where?: Where<ActivityLinks>,
  ): Promise<Count> {
    return this.courseRepository.activityLinks(id).patch(activityLinks, where);
  }

  @del('/courses/{id}/activity-links', {
    responses: {
      '200': {
        description: 'Course.ActivityLinks DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ActivityLinks)) where?: Where<ActivityLinks>,
  ): Promise<Count> {
    return this.courseRepository.activityLinks(id).delete(where);
  }
}
