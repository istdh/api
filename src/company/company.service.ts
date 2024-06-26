import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ContactInfoDTO } from './dto/contact-info.dto';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async getCompanyById(id: string) {
    const company = await this.prisma.company.findUnique({
      where: { id },
    });
    return company;
  }

  async updateLogo(logo: string, id: string) {
    await this.prisma.company.update({
      where: { id },
      data: { logo: `${process.env.IMAGE_URL}${logo}` },
    });
    return { message: 'Success', statusCode: 200 };
  }

  async updateContactInfo(id: string, contactInfoDTO: ContactInfoDTO) {
    const {
      name_company,
      website,
      email,
      phone,
      address,
      company_size,
      code_number,
      industry,
    } = contactInfoDTO;

    await this.prisma.company.update({
      data: {
        name_company,
        website,
        email,
        phone: `${code_number}.${phone}`,
        address,
        company_size,
        industry,
      },
      where: { id },
    });

    return { statusCode: 200, message: 'Success' };
  }

  async updateAboutCompany(id: string, about: string) {
    await this.prisma.company.update({
      where: { id },
      data: { description: about },
    });
    return { statusCode: 200, message: 'Success' };
  }

  async getTopCompanies() {
    const companies = await this.prisma.company.findMany({
      take: 15,
      orderBy: {
        job: {
          _count: 'desc', // Sắp xếp theo số lượng việc làm giảm dần
        },
      },
      include: {
        _count: {
          select: { job: true }, // Bao gồm số lượng việc làm trong kết quả trả về
        },
      },
    });
    return companies;
  }
}
