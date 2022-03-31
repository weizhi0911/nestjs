import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Author } from '../../entities/author/author.entity'

@Injectable()
export class AuthorService {
  constructor(@InjectRepository(Author)
  private readonly authorRepository: Repository<Author>) { }
  root(): string {
    return 'authorRepository';
  }
  async takeOutAuthor(option: Object) {
    const res = await this.authorRepository.findOne({ where: [option], relations: ["photos"] });
    console.log(res)
    return res;
  }

}