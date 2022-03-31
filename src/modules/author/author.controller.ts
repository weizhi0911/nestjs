import { Controller, Get, Query } from '@nestjs/common'
import { AuthorService } from './author.service';
import { Author } from "../../entities/author/author.entity";

@Controller('author')
export class AuthorController {
  constructor(private readonly authorRepository: AuthorService) { }
  @Get()
  root(): string {
    return this.authorRepository.root();
  }

  @Get('takeOutAuthor')
  async takeOutAuthor(@Query() query): Promise<any> {
    let author = new Author();

    if (query.id) {
      author.id = Number(query.id)
    } if (query.authorId) {
      author['authorId'] = Number(query.authorId)
      console.log(query.authorId)
    }
    return this.authorRepository.takeOutAuthor(author)
  }

}
