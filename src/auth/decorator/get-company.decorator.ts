import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

const prisma = new PrismaService();

export const GetCompany = createParamDecorator(
  async (data: unknown, context: ExecutionContext) => {
    const request = context?.switchToHttp()?.getRequest();

    const currentCandidate = await prisma?.user?.findUnique({
      where: { id: request.user.sub },
      select: { company: true },
    });

    return currentCandidate.company.id;
  },
);
