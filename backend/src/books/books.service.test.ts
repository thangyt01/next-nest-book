import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Book } from '@prisma/client';

describe('BooksService', () => {
  let service: BooksService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService, PrismaService],
    }).compile();

    service = module.get<BooksService>(BooksService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a book', async () => {
      const createBookInput: CreateBookInput = {
        title: 'Test Book',
        author: 'Test Author',
        isbn: '1234567890',
      };

      const expectedResult = { id: 1, ...createBookInput } as Book;

      jest
        .spyOn(prismaService.book, 'create')
        .mockResolvedValue(expectedResult);

      const result = await service.create(createBookInput);

      expect(result).toEqual(expectedResult);
      expect(prismaService.book.create).toHaveBeenCalledWith({
        data: createBookInput,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      const expectedResult = [
        { id: 1, title: 'Book 1' },
        { id: 2, title: 'Book 2' },
      ] as Book[];

      jest
        .spyOn(prismaService.book, 'findMany')
        .mockResolvedValue(expectedResult);

      const result = await service.findAll();

      expect(result).toEqual(expectedResult);
      expect(prismaService.book.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a book by id', async () => {
      const bookId = 1;
      const expectedResult = { id: bookId, title: 'Test Book' } as Book;

      jest
        .spyOn(prismaService.book, 'findUnique')
        .mockResolvedValue(expectedResult);

      const result = await service.findOne(bookId);

      expect(result).toEqual(expectedResult);
      expect(prismaService.book.findUnique).toHaveBeenCalledWith({
        where: { id: bookId },
      });
    });
  });

  describe('update', () => {
    it('should update a book', async () => {
      const bookId = 1;
      const updateBookInput: UpdateBookInput = {
        id: bookId,
        title: 'Updated Book',
      };
      const expectedResult = {
        id: bookId,
        title: 'Updated Book',
        author: 'Test Author',
        isbn: '1234567890',
      };

      jest
        .spyOn(prismaService.book, 'update')
        .mockResolvedValue(expectedResult);

      const result = await service.update(bookId, updateBookInput);

      expect(result).toEqual(expectedResult);
      expect(prismaService.book.update).toHaveBeenCalledWith({
        where: { id: bookId },
        data: updateBookInput,
      });
    });
  });

  describe('remove', () => {
    it('should remove a book', async () => {
      const bookId = 1;

      jest
        .spyOn(prismaService.book, 'delete')
        .mockResolvedValue({ id: bookId } as Book);

      const result = await service.remove(bookId);

      expect(result).toEqual({ id: bookId });
      expect(prismaService.book.delete).toHaveBeenCalledWith({
        where: { id: bookId },
      });
    });
  });
});
